import { createMocks } from "node-mocks-http";
import { GET, POST } from "../../../app/api/employees/route";
import {
  PUT,
  GET as getOneHandler,
  DELETE,
} from "../../../app/api/employees/[id]/route";
const api_base_url = "http://localhost:3000/api";
describe("Employees CRUD routes - /api/employees/", () => {
  test("Should Get a list of Employees", async () => {
    /// Arrange
    const { req } = createMocks({
      url: `${api_base_url}/employees?deptId=34&page=3`,
      method: "GET",
      query: {
        deptId: 2,
        page: 1,
      },
    });

    //Act
    const response = await getOneHandler(req);

    ///Assert
    expect(response.status).toBe(200);
  });
  test("Should Get a one record", async () => {
    /// Arrange
    const { req } = createMocks({
      url: `${api_base_url}/employees/2`,
      method: "GET",
      query: {
        deptId: 2,
        page: 1,
      },
    });

    //Act
    const response = await GET(req);

    ///Assert
    expect(response.status).toBe(200);
  });
  test("Should Create a Employee record", async () => {
    /// Arrange
    const employee = {
        id: "1",
        userId: "2",
        role: "employee",
        isActive: true,
        deptId: ["3"],
      };
    const { req } = createMocks({
      url: `${api_base_url}/employees`,
      method: "POST",
      body: employee,
    });

    //Act
    const response = await POST(req);

    ///Assert
    expect(response.status).toBe(201);
    expect(await response.json()).toEqual(employee);
  });

  test("Should Update a Employee record", async () => {
    /// Arrange
    const employee = {
        id: "1",
        userId: "2",
        role: "employee", 
        isActive: true,
        deptId: ["3"],
      };
    const { req } = createMocks({
      url: `${api_base_url}/employees/2`,
      method: "PUT",
      body: employee,
    });

    //Act
    const response = await PUT(req);

    ///Assert
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(employee);
  });

  test("Should Delete a Employee record", async () => {
    /// Arrange
    const { req } = createMocks({
      url: `${api_base_url}/employees/1`,
      method: "DELETE",
    });

    //Act
    const response = await DELETE(req);

    ///Assert
    expect(response.status).toBe(200);
  });
});
