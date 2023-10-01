import { NextRequest } from "next/server";
import { userEmployeeProfile } from "../../data";

export async function GET(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop()
  return  Response.json(userEmployeeProfile, {status: 200});
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop()
  return  Response.json(null, {status: 200});
}

export async function PUT(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop()
  const userEmployeeProfile  = request.body;
  return Response.json(userEmployeeProfile, {status: 200});
}

export async function PATCH(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop()
  const userEmployeeProfile  = request.body;
  return Response.json(userEmployeeProfile, {status: 200});
}

