import { NextRequest } from "next/server";
import { URL } from "url";
import { EmployeeReqParams } from "@/app/global_types";
import { randomUUID } from "crypto";
import { employeesCollection } from "../db";
import { sanitize } from "@/app/helpers";

export async function GET(request: NextRequest) {
  const params = new URL(request.url).searchParams;
  const employeeSearchParams: EmployeeReqParams = {
    managerId: params.get("managerId"),
    role: params.get("role"),
    page: params.get("page"),
  };


    
  const employees = await employeesCollection()
    .find(sanitize(employeeSearchParams), { projection: { _id: 0 } } as any)
    .toArray();
  const total = employees.length;
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
  const employee = await request.json();

  const data = {
    ...employee,
    createdAt: new Date().getTime(),
    id: randomUUID(),
  };
  await employeesCollection().updateOne(
    { userId: data.userId },
    { $set: data },
    {
      upsert: true,
      projection: { _id: 0 },
    } as any
  );

  return Response.json(employee, { status: 201 });
}
