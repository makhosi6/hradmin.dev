import { userEmployeeProfile } from "../../../app/_store/data";
import { RequestMethod, createMocks } from "node-mocks-http";
import {
  POST,
  PUT,
  GET,
  DELETE,
} from "../../../app/api/employees-profile/route";
import { UserEmployeeProfile } from "@/app/_lib/global_types";
const api_base_url = "http://localhost:3000/api";
describe("UserEmployeeProfile CRUD routes - /api/employees-profile/", () => {
  test("Should Get a one (UserEmployeeProfile)", async () => {
    /// Arrange
    const { req } = createMocks({
      url: `${api_base_url}/employees-profile`,
      method: "GET",
      query: {
        managerId: 2,
        page: 1,
      },
    });

    //Act
    const response = await GET(req);

    ///Assert
    expect(response.status).toBe(200);
  });
  test("Should Create a UserEmployeeProfile record", async () => {
    /// Arrange
    const userEmployeeProfile = {
      userId: "1",
      username: "john_doe",
      name: "John",
      email: "john.doe@example.com",
      role: "employee",
      employee_details: {
        employee_id: "101",
        manager_id: [],
        department: [],
        isActive: true,
      },
    };
    const { req } = createMocks({
      url: `${api_base_url}/employees-profile`,
      method: "POST",
      body: userEmployeeProfile,
    });
    const { req: badReq } = createMocks({
      url: `${api_base_url}/employees-profile`,
      method: "POST",
      body: userEmployeeProfile,
    });

    //Act
    const response = await POST(req);
    const badResponse = await POST(badReq);

    ///Assert
    // expect(badResponse.status).toBe(400);

    expect(response.status).toBe(201);
  });

  test("Should Update a UserEmployeeProfile record", async () => {
    /// Arrange
    const userEmployeeProfile = {
      userId: "1",
      username: "john_doe",
      name: "John",
      email: "john.doe@example.com",
      role: "employee",
      employee_details: {
        employee_id: "101",
        manager_id: [],
        department: [],
        isActive: true,
      },
    };
    const { req } = createMocks({
      url: `${api_base_url}/employees-profile`,
      method: "PUT",
      body: userEmployeeProfile,
    });

    //Act
    const response = await PUT(req);

    ///Assert
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(userEmployeeProfile);
  });

  test("Should Delete a UserEmployeeProfile record", async () => {
    /// Arrange
    let url = `${api_base_url}/employees-profile`;
    let method: RequestMethod = "DELETE";
    const { req } = createMocks({ url: `${url}/?employeeId=213`,method });
    const { req: badReq } = createMocks({ url, method });

    //Act
    const response = await DELETE(req);
    const badResponse = await DELETE(badReq);

    ///Assert
    // expect(badResponse.status).toBe(400);
    expect(response.status).toBe(200);
  });
});
