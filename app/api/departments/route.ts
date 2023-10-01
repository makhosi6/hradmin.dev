import { NextRequest } from "next/server";
import { departments } from "../data";

export async function GET(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop();
  return Response.json(departments.filter((dept) => dept.id == id)[0]);
}

export async function DELETE(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop();
  return Response.json(null, { status: 200 });
}

export async function PUT(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop();
  const dept = request.body;
  return Response.json(dept,{ status: 200 }
  );
}

export async function PATCH(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop();
  const dept = request.body;
  return Response.json(dept, { status: 200 });
}
