export type Dept = {
  id: string;
  name: string;
  status: string;
  manager_id?: string;
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
    manager_id: string[];
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
  deptId: string | null;
  userId: string | null;
  role: string | null;
  page: string | null
};


export type UserProfileReqParams = {
employeeId: string | null;
page: string | null
}

export type ValidateEmailReqParams = {email: string| null;}
export type DeptReqParams = {managerId: string| null; page: string | null}