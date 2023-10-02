import { NextRequest } from "next/server";
import { users } from "../data";

export async function GET(request: NextRequest) {
  const params = new URL(request.url).searchParams;
  return Response.json({
    page: Number(params.get('page') || 1),
    next_page: Number(params.get('page') || 1) + 1,
    total: users.length,
    per_page: users.length,
    numberOfPages: Math.ceil(users.length / 20),
    data: users,
  });

}

export async function POST(request: Request) {
  const user  = request.body;
  return Response.json(user, {status: 201});
}

