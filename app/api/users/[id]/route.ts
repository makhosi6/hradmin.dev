import { NextRequest } from "next/server";
import { employees, users } from "../../../_store/data";
import { usersCollection } from "../../db";

export async function GET(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop();
  const data = await usersCollection()
    .find({ id }, { projection: { _id: 0 } } as any)
    .toArray();
  const user = data.length > 0 ? data[0] : {};
  return Response.json(user, {status: 200})
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop();
  await usersCollection().deleteOne({ id }, {
    projection: { _id: 0 },
  } as any);

  return Response.json(null, { status: 200 });
}

export async function PUT(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop();
  const user = await request.json();
  const updated = { ...user, updatedAt: new Date().getTime() };
  await usersCollection().updateOne({ id }, { $set: updated }, {
    projection: { _id: 0 },
  } as any);

  return Response.json(updated, { status: 200 });
}
