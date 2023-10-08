import { NextRequest } from "next/server";
import { departmentsCollection } from "../../db";

export async function GET(request: Request) {
const id = new URL(request.url).pathname.split("/").pop()
const data = await departmentsCollection()
.find({ id }, { projection: { _id: 0 } } as any)
.toArray();
const department = data.length > 0 ? data[0] : {};
  return Response.json(department, {status: 200});
}

export async function PUT(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop()
  const department  = await request.json();
  const updated = { ...department, updatedAt: new Date().getTime() };
  await departmentsCollection().updateOne({ id }, { $set: updated }, {
    projection: { _id: 0 },
  } as any);
  return Response.json(updated, {status: 200});
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop()
  await departmentsCollection().deleteOne({ id }, {
    projection: { _id: 0 },
  } as any);

  return Response.json(null, {status: 200});
}

