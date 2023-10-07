import { ValidateEmailReqParams } from "@/app/global_types";
import { users } from "../data";
import { randomUUID } from "crypto";
import { usersCollection } from "../db";

export async function HEAD(request: Request) {
  const params = new URL(request.url).searchParams;
  console.log({ params });
  console.log({ request: new URL(request.url) });
  const validateEmailParams: ValidateEmailReqParams = {
    email: params.get("email"),
  };
  if (!validateEmailParams.email) {
    return Response.json(null, { status: 400 });
  }

  const usersArr = await usersCollection()
    .find({ email: validateEmailParams.email })
    .toArray();

  return usersArr.length > 0
    ? Response.json(null, { status: 200 })
    : Response.json(null, { status: 404 });
}
