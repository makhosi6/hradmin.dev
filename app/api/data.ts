import { Dept, Employee, User, UserEmployeeProfile } from "../global_types";

export const departments: Array<Dept> = [
  {
    id: "1",
    name: "HR",
    status: "Active",
  },
  {
    id: "2",
    name: "Finance",
    status: "Active",
    manager_id: "1",
  },
  {
    id: "3",
    name: "Marketing",
    status: "Active",
    manager_id: "4",
  },
  {
    id: "4",
    name: "Manufacturing",
    status: "Active",
    manager_id: "2",
  },
  {
    id: "5",
    name: "Management",
    status: "Active",
    manager_id: "1",
  },
];

export const users: Array<User> = [
  {
    id: "1",
    username: "john_doe",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    password: "",
  },
  {
    id: "2",
    username: "jane21",
    first_name: "Jane",
    last_name: "Doe",
    email: "jd@example.com",
    password: "",
  },
  {
    id: "3",
    username: "super1",
    first_name: "HR",
    last_name: "Admin",
    email: "hradmin@test.com",
    password: "TestPass1234",
  },
  {
    id: "4",
    username: "john",
    first_name: "John",
    last_name: "Smith",
    email: "jd@example.com",
    password: "Password123#",
  },
];
{
}

export const employees: Array<Employee> = [
  {
    id: "1",
    userId: "2",
    role: "employee", // ("employee" "manager," or "HR Administrator")
    isActive: true,
    deptId: ["3"],
  },
  {
    id: "2",
    userId: "3",
    role: "manager", // ("employee" "manager," or "HR Administrator")
    isActive: true,
    deptId: ["4"],
  },
];
//use to process outgoing data
export const aggregateUserEmployeeProfile = ({
  user,
  employee,
}: {
  user: User;
  employee: Employee;
}): UserEmployeeProfile => { 
  /// get manages 
  const managers: Array<Dept> = [

  ];
  return {
  userId: user.id,
  username: user.username,
  first_name: user.first_name,
  last_name: user.last_name,
  email: user.email,
  role: employee.role,
  employee_details: {
    employee_id: employee.id,
    manager_id: managers.map(dept => dept.manager_id || ""), 
    department: employee.deptId,
    isActive: employee.isActive,
  } }
};

// used to process incoming data before sending
export const deconstructUserEmployeeProfile = (
  userEmployeeProfile: UserEmployeeProfile
): [User, Employee] => {
  const {
    employee_details,
    userId,
    role,
    username,
    email,
    last_name,
    first_name,
  } = userEmployeeProfile;
  /// employee from 'userEmployeeProfile'
  const employee: Employee = {
    id: employee_details.employee_id,
    userId,
    role,
    isActive: employee_details.isActive,
    deptId: employee_details.department,
  };
  /// user from 'userEmployeeProfile'
  const user: User = {
    id: userId,
    username,
    first_name,
    last_name,
    email,
    password: null,
  };

  // AND combine them
  return [user, employee];
};

/// aggregated data
export const userEmployeeProfile: UserEmployeeProfile = {
  userId: "1",
  username: "john_doe",
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  role: "employee",
  employee_details: {
    employee_id: "101",
    manager_id: [],
    department: [],
    isActive: true,
  },
};
