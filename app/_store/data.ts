import {
  Dept,
  Employee,
  User,
  UserEmployeeProfile,
} from "../_lib/global_types";

const departments: Array<Dept> = [
  {
    id: "1",
    name: "HR",
    status: "Active",
    manager_id: "4",
    createdAt: new Date().getTime(),
  },
  {
    id: "2",
    name: "Finance",
    status: "Active",
    manager_id: "2",
    createdAt: new Date().getTime(),
  },
  {
    id: "3",
    name: "Marketing",
    status: "Active",
    manager_id: "2",
    createdAt: new Date().getTime(),
  },
  {
    id: "4",
    name: "Manufacturing",
    status: "Active",
    manager_id: "2",
    createdAt: new Date().getTime(),
  },
  {
    id: "5",
    name: "Management",
    status: "Active",
    manager_id: "2",
    createdAt: new Date().getTime(),
  },
  {
    id: "6",
    name: "R&D",
    status: "InActive",
    createdAt: new Date().getTime(),
    manager_id: "2",
  },
  {
    id: "6",
    name: "ProductDesign90",
    status: "InActive",
    manager_id: "2",
    createdAt: new Date().getTime(),
  },
  {
    id: "7",
    name: "ProductDesign12",
    status: "InActive",
    manager_id: "2",
    createdAt: new Date().getTime(),
  },
  {
    id: "8",
    name: "ProductDesign4",
    status: "InActive",
    manager_id: "2",
    createdAt: new Date().getTime(),
  },
  {
    id: "9",
    name: "ProductDesign9",
    status: "InActive",
    manager_id: "2",
    createdAt: new Date().getTime(),
  },
  {
    id: "10",
    name: "ProductDesign10",
    status: "InActive",
    manager_id: "2",
    createdAt: new Date().getTime(),
  },
  {
    id: "11",
    name: "ProductDesign11",
    status: "InActive",
    manager_id: "2",
    createdAt: new Date().getTime(),
  },
];

const users: Array<User> = [
  {
    id: "1",
    username: "john_doe",
    name: "John",
    phoneNumber: "0000000000000",
    email: "john.doe@example.com",
    password: "",
    createdAt: new Date().getTime(),
  },
  {
    id: "2",
    username: "jane21",
    name: "Jane",
    phoneNumber: "0000000000000",
    email: "jd@example.com",
    password: "",
    createdAt: new Date().getTime(),
  },
  {
    id: "4",
    username: "bob",
    name: "Robert",
    phoneNumber: "0000000000000",
    email: "bob@example.com",
    password: "",
    createdAt: new Date().getTime(),
  },
  {
    id: "3",
    username: "super1",
    name: "HR",
    phoneNumber: "0000000000000",
    email: "hradmin@test.com",
    password: "TestPass1234",
    createdAt: new Date().getTime(),
  },
  {
    id: "4",
    username: "john",
    name: "John",
    phoneNumber: "0000000000000",
    email: "jd@example.com",
    password: "Password123#",
    createdAt: new Date().getTime(),
  },
];
{
}

const employees: Array<Employee> = [
  {
    id: "1",
    userId: "2",
    role: "employee", // ("employee" "manager," or "HR Administrator")
    isActive: true,
    deptId: ["3"],
    createdAt: new Date().getTime(),
  },
  {
    id: "2",
    userId: "2",
    role: "manager", // ("employee" "manager," or "HR Administrator")
    isActive: true,
    deptId: ["4"],
    createdAt: new Date().getTime(),
  },
  {
    id: "4",
    userId: "4",
    role: "manager", // ("employee" "manager," or "HR Administrator")
    isActive: true,
    deptId: ["1"],
    createdAt: new Date().getTime(),
  },
];

/// aggregated data
const userEmployeeProfile: UserEmployeeProfile = {
  userId: "1",
  username: "john_doe",
  name: "John",
  phoneNumber: "000000000500",
  email: "john.doe@example.com",
  createdAt: new Date().getTime(),
  role: "employee",
  employee_details: {
    createdAt: new Date().getTime(),
    employee_id: "101",
    department: ["1"],
    isActive: true,
  },
};

// export {
//   departments, users, employees, userEmployeeProfile,
// }
