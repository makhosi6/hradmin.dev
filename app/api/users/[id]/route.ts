import { NextRequest } from "next/server";
import { employees, users } from "../../data";

export async function GET(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop()
  const random = Math.floor(Math.random() * employees.length)
  return Response.json(users[random]);
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop()
  return  Response.json(null, {status: 200});
}

export async function PUT(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop()
  const user  = await request.json();
  return Response.json(user, {status: 200});
}



