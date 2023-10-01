import { NextRequest } from "next/server";
import { users } from "../data";

export async function GET(request: NextRequest) {
  const params = new URL(request.url).searchParams;
  return Response.json(users);

}

export async function POST(request: Request) {
  const user  = request.body;
  return Response.json(user, {status: 201});
}

