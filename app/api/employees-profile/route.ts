import { NextRequest } from "next/server";
import { userEmployeeProfile } from "../data";

export async function GET(request: NextRequest) {
  const params = new URL(request.url).searchParams;

  const employeeSearchParams: UserProfileReqParams = {
    employeeId: params.get("employeeId"),
  };
 
  /// get and return employees where employeeId==`employeeId`


  return Response.json(userEmployeeProfile);

}

export async function POST(request: Request) {
  const userEmployeeProfile  = request.body;
  return Response.json(userEmployeeProfile, {status: 201});
}

