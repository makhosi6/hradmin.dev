import {
  deconstructUserEmployeeProfile,
  aggregateUserEmployeeProfile,
  users,
  employees,
} from "./../data";
import { NextRequest } from "next/server";
import {
  UserEmployeeProfile,
  UserProfileReqParams,
  Employee,
  EmployeeReqParams,
} from "@/app/global_types";
import { fetchWrapper } from "../../helpers";

export async function GET(request: NextRequest) {
  const params = new URL(request.url).searchParams;

  const employeeSearchParams: UserProfileReqParams = {
    employeeId: params.get("employeeId"),
    role: params.get("role"),
    managerId: params.get("managerId"),
    page: params.get("page"),
  };

  if (!employeeSearchParams.employeeId) {
    let requestParams: EmployeeReqParams  = {};
    if (employeeSearchParams.role) {
      requestParams["managerId"] = employeeSearchParams.managerId;
    } else if (employeeSearchParams.role) {
      requestParams["role"] = employeeSearchParams.role;
    }
    const { data } = await fetchWrapper({
      method: "GET",
      collection: "employees",
      path: "",
      requestParams,
    });

    const allEmployees = data.map(async (employee: Employee) => {
      const user = await fetchWrapper({
        collection: "users",
        path: employee.userId,
        method: "GET",
      });
      return aggregateUserEmployeeProfile({ user, employee });
    });

    return Response.json(
      {
        page: 1,
        next_page: null,
        total: 1,
        per_page: 1,
        numberOfPages: 1,
        data: allEmployees,
      },
      { status: 200 }
    );
  }

  /// get employee where employeeId==`employeeId`
  const employee = await fetchWrapper({
    method: "GET",
    collection: "employees",
    path: employeeSearchParams.employeeId,
  });

  const user = await fetchWrapper({
    method: "GET",
    collection: "users",
    path: employee.userId,
  });

  // AND combine them
  const userEmployeeProfile = aggregateUserEmployeeProfile({ user, employee });

  return Response.json({
    page: 1,
    next_page: null,
    total: 1,
    per_page: 1,
    numberOfPages: 1,
    data: [userEmployeeProfile],
  });
}

export async function POST(request: Request) {
  const _userEmployeeProfile = await request.json();

  const [user, employee] = deconstructUserEmployeeProfile({
    password: "PASSWORD",
    ..._userEmployeeProfile,
  });

  const createUser = await fetchWrapper({
    collection: "users",
    method: "POST",
    path: "",
    body: user,
  });
  const createEmployee = await fetchWrapper({
    collection: "",
    method: "POST",
    path: "",
    body: employee,
  });

  return Response.json(_userEmployeeProfile, { status: 201 });
}

export async function DELETE(request: Request) {
  const params = new URL(request.url).searchParams;

  const employeeSearchParams: UserProfileReqParams = {
    employeeId: params.get("employeeId"),
    page: null,
  };
  if (employeeSearchParams.employeeId == null)
    return Response.json(null, { status: 400 });

  const employee = await fetchWrapper({
    collection: "employees",
    method: "GET",
    path: employeeSearchParams.employeeId,
  });
  const deleteEmployee = await fetchWrapper({
    collection: "employees",
    method: "DELETE",
    path: employeeSearchParams.employeeId,
  });
  const deleteUser = await fetchWrapper({
    collection: "users",
    method: "DELETE",
    path: employee.userId,
  });

  return Response.json(null, { status: 200 });
}

export async function PUT(request: Request) {
  const params = new URL(request.url).searchParams;

  const employeeSearchParams: UserProfileReqParams = {
    employeeId: params.get("employeeId"),
    page: null,
  };
  if (employeeSearchParams.employeeId == null)
    return Response.json(null, { status: 400 });
  const userEmployeeProfile = (await request.json()) as UserEmployeeProfile;

  ///
  const [user, employee] = deconstructUserEmployeeProfile(userEmployeeProfile);

  const updateUser = await fetchWrapper({
    collection: "users",
    method: "PUT",
    path: user.id,
    body: user,
  });
  const updateEmployee = await fetchWrapper({
    collection: "employees",
    method: "PUT",
    path: employee.id,
    body: employee,
  });
  ///
  return Response.json(userEmployeeProfile, { status: 200 });
}
