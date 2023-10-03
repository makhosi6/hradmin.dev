import { NextRequest } from "next/server";
import { employees } from "../../data";

export async function GET(request: Request) {
const id = new URL(request.url).pathname.split("/").pop()

  return Response.json(employees[0]);
}

export async function PUT(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop()
  const employee  = await request.json();
  return Response.json(employee, {status: 200});
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop()
  return Response.json(null, {status: 200});
}
