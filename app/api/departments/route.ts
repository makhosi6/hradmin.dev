import { NextRequest } from "next/server";
import { DeptReqParams } from "@/app/global_types";
import { randomUUID } from "crypto";
import { departmentsCollection } from "../db";

export async function GET(request: NextRequest) {
  const params = new URL(request.url).searchParams;
  const employeeSearchParams: DeptReqParams = {
    managerId: params.get("managerId"),
    page: params.get("page"),
  };
  const filters = employeeSearchParams.managerId
    ? { manager_id: employeeSearchParams.managerId }
    : {};

  const departments = await departmentsCollection()
    .find(filters, { projection: { _id: 0 } } as any)
    .toArray();

  return Response.json({
    next_page: null,
    per_page: 1,
    page: Number(employeeSearchParams.page || 0),
    total: departments.length,
    numberOfPages: Math.ceil(departments.length / 20),
    data: departments,
  });
}

export async function POST(request: NextRequest) {
  const dept = await request.json();

  const data = {
    ...dept,
    createdAt: new Date().getTime(),
    id: randomUUID(),
  };
  await departmentsCollection().updateOne(
    { name: data.name, manager_id: data.manager_id },
    { $set: data },
    {
      upsert: true,
      projection: { _id: 0 },
    } as any
  );

  return Response.json(data, { status: 201 });
}
