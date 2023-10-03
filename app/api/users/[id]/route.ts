import { NextRequest } from "next/server";
import { users } from "../../data";

export async function GET(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop()
  return Response.json(users[0]);
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



