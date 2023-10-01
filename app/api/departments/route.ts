import { NextRequest } from "next/server";
import { URL, URLSearchParams } from "url";
import { departments } from "../data";


export async function GET(request: NextRequest) {
  const params = new URL(request.url).searchParams;
  const employeeSearchParams: DeptReqParams = {
    managerId: params.get("managerId"),
 
  };
 
  /// get and return employees where deptId==`deptId` && userId==`userId` && role==`role`
  return Response.json(departments);
}

export async function POST(request: NextRequest) {
  const dept  = request.body;
  return Response.json(dept, {status: 201});
}
