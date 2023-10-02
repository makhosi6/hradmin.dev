import {
  deconstructUserEmployeeProfile,
  aggregateUserEmployeeProfile,
  users,
  employees,
} from "./../data";
import { NextRequest } from "next/server";
import { departments, userEmployeeProfile } from "../data";
import { UserEmployeeProfile, UserProfileReqParams } from "@/app/global_types";

export async function GET(request: NextRequest) {
  const params = new URL(request.url).searchParams;

  const employeeSearchParams: UserProfileReqParams = {
    employeeId: params.get("employeeId"),
    page: params.get("page"),
  };

  // if (!employeeSearchParams.employeeId) {
  //   return Response.json(null, { status: 400 });
  // }

  /// get employee where employeeId==`employeeId`
  const employee = employees[0];
  /// get user where userId==`employee`
  const user = users[0];
  // get departments mentioned @ `employee record`

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
  const _userEmployeeProfile = request.body;
  return Response.json(_userEmployeeProfile, { status: 201 });
}

export async function DELETE(request: Request) {
  const params = new URL(request.url).searchParams;

  const employeeSearchParams: UserProfileReqParams = {
    employeeId: params.get("employeeId"),
    page: null,
  };

  console.log({OD: employeeSearchParams?.employeeId});
  
  // if(employeeSearchParams.employeeId == null) return Response.json(null, { status: 400 });
  /// and delete via api/employee/:id
  return Response.json(null, { status: 200 });
}

export async function PUT(request: Request) {
  const params = new URL(request.url).searchParams;

  const employeeSearchParams: UserProfileReqParams = {
    employeeId: params.get("employeeId"),
    page: null,
  };
//  if(employeeSearchParams.employeeId == null) return Response.json(null, { status: 400 });
  const userEmployeeProfile = request.body as unknown as UserEmployeeProfile;

  ///
  const [user, employee] = deconstructUserEmployeeProfile(userEmployeeProfile);

  /// and update via api/user/:id && api/employee/:id
  ///
  return Response.json(userEmployeeProfile, { status: 200 });
}
