import { type } from "os";
import Employees from "../employees/page";

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

export const users = [
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

export const aggregatedUserEmployeeProfile = (employeeId: string): UserEmployeeProfile => {
  return userEmployeeProfile;
};

export const deconstructUserEmployeeProfile = (employeeId: string): [User, Employee, Dept] => {
  return [users[1], employees[1], departments[0]];
};

/// aggregated data
export const userEmployeeProfile: UserEmployeeProfile = {
  id: 1,
  username: "john_doe",
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  role: "employee",
  employee_details: {
    employee_id: 101,
    telephone_number: "123-456-7890",
    manager_id: [],
    department: [],
    isActive: true,
  },
};

