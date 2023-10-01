import { NextRequest } from "next/server";
import { URL, URLSearchParams } from "url";
import { employees,  } from "../data";


export async function GET(request: NextRequest) {
  const params = new URL(request.url).searchParams;
  const employeeSearchParams: EmployeeReqParams = {
    deptId: params.get("deptId"),
    userId: params.get("userId"),
    role: params.get("role"),
  };
 
  /// get and return employees where deptId==`deptId` && userId==`userId` && role==`role`
  return Response.json(employees);
}

export async function POST(request: NextRequest) {
  const employee  = request.body;
  return Response.json(employee, {status: 201});
}
