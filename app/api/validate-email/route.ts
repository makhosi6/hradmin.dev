import { NextRequest } from "next/server";

export async function HEAD(request: Request) {
  var val = 70;
  return (val == 9) ?  Response.json(null, {status: 404}) : Response.json(null, {status: 200})
}