export type Dept = {
  id?: string;
  name: string;
  status: string;
  manager_id?: string;
};
export type FetchParams = {
  method: string;
  collection: string;
  path: string;
  requestParams?: any;
  body?: any;
};

export type UserEmployeeProfile = {
  userId?: string;
  username: string;
  name: string;
  email: string;
  role: string;
  employee_details: {
    employee_id?: string;
    department: string[];
    isActive: boolean;
  };
};

export type Employee = {
  id: string;
  userId: string;
  role: string;
  isActive: boolean;
  deptId: string[];
};

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string | null;
};

export type EmployeeReqParams = {
  managerId?: string | null;
  role?: string | null;
  page?: string | null;
};

export const Status = {
  active: "active",
  inactive: "inactive",
};
export const Role = {
  employee: "employee",
  manager: "manager",
  admin: "admin",
  other: "other",
};
export type UserProfileReqParams = {
  employeeId?: string | null;
  page?: string | null;
  role?: string | null;
  managerId?: string | null;
};

export type ValidateEmailReqParams = { email: string | null };
export type DeptReqParams = { managerId: string | null; page: string | null };
export type UserCredentials = { email: string; password: string };
