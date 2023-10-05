import { NextRequest } from "next/server";
import { URL, URLSearchParams } from "url";
import { employees } from "../data";
import { EmployeeReqParams } from "@/app/global_types";

export async function GET(request: NextRequest) {
  const params = new URL(request.url).searchParams;
  const employeeSearchParams: EmployeeReqParams = {
    managerId: params.get("managerId"),
    role: params.get("role"),
    page: params.get("page"),
  };
  const total = employees.length;
  /// get and return employees where deptId==`deptId` && userId==`userId` && role==`role`
  return Response.json({
    page: Number(employeeSearchParams.page || 0),
    next_page: Number(employeeSearchParams.page || 1) + 1,
    total,
    per_page: total,
    numberOfPages: Math.ceil(total / 20),
    data: employees,
  });
}

export async function POST(request: NextRequest) {
  const employee = await request.json()
  return Response.json(employee, { status: 201 });
}
