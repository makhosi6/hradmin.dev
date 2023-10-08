import { NextRequest } from "next/server";
import { usersCollection } from "../db";
import { hashSync, genSaltSync } from "bcrypt";
import { randomUUID } from "crypto";

export async function GET(request: NextRequest) {
  const users = await usersCollection()
    .find({}, { projection: { _id: 0 } } as any)
    .toArray();
  const params = new URL(request.url).searchParams;
  return Response.json({
    page: Number(params.get("page") || 1),
    next_page: Number(params.get("page") || 1) + 1,
    total: users.length,
    per_page: users.length,
    numberOfPages: Math.ceil(users.length / 20),
    data: users,
  });
}


export async function POST(request: Request) {
  const user = await request.json();

  const data = {
    ...user,
    id: randomUUID(),
    createdAt: new Date().getTime(),
    password: hashPassword(user?.password),
  };
  await usersCollection().updateOne({ email: data.email }, { $set: data }, {
    upsert: true,
    projection: { _id: 0 },
  } as any);

  return Response.json(data, { status: 201 });
}


 function hashPassword(pass?: string) {
  const defaultPassword = pass || "Password123#";
  const salt = genSaltSync(10);
  const hash = hashSync(defaultPassword, salt);
  return hash;
}