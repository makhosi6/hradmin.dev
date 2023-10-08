import { employeesCollection } from "../../db";

export async function GET(request: Request) {
const id = new URL(request.url).pathname.split("/").pop()
const data = await employeesCollection()
.find({ id }, { projection: { _id: 0 } } as any)
.toArray();
const employee = data.length > 0 ? data[0] : {};
  return Response.json(employee);
}

export async function PUT(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop()
  const employee  = await request.json();
  const updated = { ...employee, updatedAt: new Date().getTime() };
  await employeesCollection().updateOne({ id }, { $set: updated }, {
    projection: { _id: 0 },
  } as any);

  return Response.json(employee, {status: 200});
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop()
  await employeesCollection().deleteOne({ id }, {
    projection: { _id: 0 },
  } as any);
  return Response.json(null, {status: 200});
}
