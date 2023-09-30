import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  return Response.json({data: 80})
}

export async function POST(request: NextRequest) {
  return Response.json({data: 90})
}