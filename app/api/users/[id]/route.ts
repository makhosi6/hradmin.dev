import { NextRequest } from "next/server";

export async function GET(request: Request) {
  return Response.json({ data: "data" });
}

export async function HEAD(request: Request) {
  return Response.json({ data: "data" });
}

export async function POST(request: Request) {
  return Response.json({ data: "data" });
}

export async function PUT(request: Request) {
  return Response.json({ data: "data" });
}

export async function DELETE(request: Request) {
  return Response.json({ data: "data" });
}

export async function PATCH(request: Request) {
  return Response.json({ data: "data" });
}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {
  return Response.json({ data: "data" });
}
