import { NextRequest } from "next/server";
import { departments } from "../data";
import { DeptReqParams } from "@/app/global_types";

export async function GET(request: NextRequest) {
  const params = new URL(request.url).searchParams;
  const employeeSearchParams: DeptReqParams = {
    managerId: params.get("managerId"),
    page: params.get("page"),
  };

  /// get and return employees where deptId==`deptId` && userId==`userId` && role==`role`
  return Response.json({
    next_page: null,
    per_page: 1,
    page: Number(employeeSearchParams.page || 0),
    total: departments.length,
    numberOfPages: Math.ceil(departments.length / 20),
    data: departments
  
  });
}

export async function POST(request: NextRequest) {
  const dept  = request.body;
  return Response.json(dept, {status: 201});
}
