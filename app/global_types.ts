type Dept = {
  id: string;
  name: string;
  status: string;
  manager_id?: string;
};

type UserEmployeeProfile = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  employee_details: {
    employee_id: number;
    telephone_number: string;
    manager_id: never[];
    department: never[];
    isActive: boolean;
  };
};

type Employee = {
  id: string;
  userId: string;
  role: string;
  isActive: boolean;
  deptId: string[];
};

type User = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

type EmployeeReqParams = {
  deptId: string | null;
  userId: string | null;
  role: string | null;
};


type UserProfileReqParams = {
employeeId: string | null;
}

type ValidateEmailReqParams = {email: string| null;}