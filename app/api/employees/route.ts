import { NextRequest } from "next/server";
import { URL, URLSearchParams } from "url";
import { employees } from "../data";
import { EmployeeReqParams } from "@/app/global_types";

export async function GET(request: NextRequest) {
  const params = new URL(request.url).searchParams;
  const employeeSearchParams: EmployeeReqParams = {
    deptId: params.get("deptId"),
    userId: params.get("userId"),
    role: params.get("role"),
    page: params.get("page"),
  };
const  numberOfPages = employees.length / 20;
const total = employees.length;
  /// get and return employees where deptId==`deptId` && userId==`userId` && role==`role`
  return Response.json({
    page: Number(employeeSearchParams.page || 0),
    next_page: Number(employeeSearchParams.page || 1) + 1,
    total: employees.length,
    per_page: employees.length,
    numberOfPages: Math.ceil(employees.length / 20),
    data: employees,
  });
}

export async function POST(request: NextRequest) {
  const employee = request.body;
  return Response.json(employee, { status: 201 });
}
