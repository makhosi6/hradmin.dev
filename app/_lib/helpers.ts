import cleanDeep from "clean-deep";
import {
  Employee,
  FetchParams,
  Status,
  User,
  UserEmployeeProfile,
} from "./global_types";

export const fetchWrapper = async ({
  method,
  collection,
  path,
  requestParams = {},
  body,
}: FetchParams): Promise<any> => {
  try {
    let headers = new Headers();
    headers.append("Authorization", "Bearer TOKEN");
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002/api";
    let url = new URL(`${baseUrl}/${collection}/${path}`);

    if (JSON.stringify(requestParams) != "{}") {
      Object.keys(requestParams).forEach((key) =>
        url.searchParams.append(key, requestParams[key])
      );
    }

    const response = await fetch(url, {
      method,
      headers: headers,
      body: JSON.stringify(body) || undefined,
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log({ error });

    null;
  }
};

export function statusAsBool(status: string) {
  return status?.toLowerCase() === Status.active;
}

export function sanitize(data: object) {
  return cleanDeep(data);
}

//use to process outgoing data
export const aggregateUserEmployeeProfile = ({
  user,
  employee,
}: {
  user: User;
  employee: Employee;
}): UserEmployeeProfile => {
  return {
    userId: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: employee.role,
    password: `${user.password}`,
    createdAt: user.createdAt,
    employee_details: {
      createdAt: employee.createdAt,
      employee_id: employee.id,
      department: employee.deptId,
      isActive: employee.isActive,
    },
  };
};

// used to process incoming data before sending
export const deconstructUserEmployeeProfile = (
  userEmployeeProfile: UserEmployeeProfile
): [User, Employee] => {
  const { employee_details, userId, role, email, username, name } =
    userEmployeeProfile;

  /// employee from 'userEmployeeProfile'
  const employee: Employee = {
    isActive: employee_details.isActive,
    id: `${employee_details.employee_id}`,
    userId: `${userId}`,
    role,
    createdAt: new Date().getTime(),
    deptId: employee_details.department,
  };
  /// user from 'userEmployeeProfile'
  const user: User = {
    id: employee.userId,
    phoneNumber: userEmployeeProfile.phoneNumber,
    username,
    name,
    email,
    password: userEmployeeProfile.password,
    createdAt: new Date().getTime(),
  };

  // AND combine them
  return [user, employee];
};
