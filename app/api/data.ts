import { Dept, Employee, User, UserEmployeeProfile } from "../global_types";

export const departments: Array<Dept> = [
  {
    id: "1",
    name: "HR",
    status: "Active",
    manager_id: "4",
  },
  {
    id: "2",
    name: "Finance",
    status: "Active",
    manager_id: "2",
  },
  {
    id: "3",
    name: "Marketing",
    status: "Active",
    manager_id: "2",
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
    manager_id: "2",
  },
  {
    id: "6",
    name: "R&D",
    status: "InActive",
    manager_id: "2",
  },
];

export const users: Array<User> = [
  {
    id: "1",
    username: "john_doe",
    name: "John",
    email: "john.doe@example.com",
    password: "",
  },
  {
    id: "2",
    username: "jane21",
    name: "Jane",
    email: "jd@example.com",
    password: "",
  },
  {
    id: "4",
    username: "bob",
    name: "Robert",
    email: "bob@example.com",
    password: "",
  },
  {
    id: "3",
    username: "super1",
    name: "HR",
    email: "hradmin@test.com",
    password: "TestPass1234",
  },
  {
    id: "4",
    username: "john",
    name: "John",
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
    userId: "2",
    role: "manager", // ("employee" "manager," or "HR Administrator")
    isActive: true,
    deptId: ["4"],
  },
  {
    id: "4",
    userId: "4",
    role: "manager", // ("employee" "manager," or "HR Administrator")
    isActive: true,
    deptId: ["1"],
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
  name: user.name,
  email: user.email,
  role: employee.role,
  employee_details: {
    employee_id: employee.id,
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
    email,
    username,
    name,
  } = userEmployeeProfile;

  console.log({employee_details, userEmployeeProfile});
  
  /// employee from 'userEmployeeProfile'
  const employee: Employee = {
    isActive: employee_details.isActive,
    id: `${employee_details.employee_id}`,
    userId: `${userId}`,
    role,
    deptId: employee_details.department,
  };
  /// user from 'userEmployeeProfile'
  const user: User = {
    id: employee.userId,
    username,
    name,
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
  name: "John",
  email: "john.doe@example.com",
  role: "employee",
  employee_details: {
    employee_id: "101",
    department: ['1'],
    isActive: true,
  },
};
