import { ValidateEmailReqParams } from "@/app/_lib/global_types";
import { usersCollection } from "../db";

export async function HEAD(request: Request) {
  const params = new URL(request.url).searchParams;
  const validateEmailParams: ValidateEmailReqParams = {
    email: params.get("email"),
  };
  if (!validateEmailParams.email) {
    return Response.json(null, { status: 400 });
  }

  const usersArr = await usersCollection()
    .find({ email: validateEmailParams.email }, {
      projection: { _id: 0 },
    } as any)
    .toArray();

  return usersArr.length > 0
    ? Response.json(null, { status: 200 })
    : Response.json(null, { status: 404 });
}
