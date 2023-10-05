export type Dept = {
  id: string;
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
  userId: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  employee_details: {
    employee_id: string;
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
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string | null;
};

export type EmployeeReqParams = {
  managerId?: string | null;
  role?: string | null;
  page?: string | null;
};

export enum Status {
  active,
  inactive,
}

export type UserProfileReqParams = {
  employeeId?: string | null;
  page?: string | null;
  role?: string | null;
  managerId?: string | null;
};

export type ValidateEmailReqParams = { email: string | null };
export type DeptReqParams = { managerId: string | null; page: string | null };
export type UserCredentials = { email: string; password: string };
