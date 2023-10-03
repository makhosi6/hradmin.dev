import { createMocks } from "node-mocks-http";
import { GET, POST } from "../../../app/api/departments/route";
import {
  PUT,
  GET as getOneHandler,
  DELETE,
} from "../../../app/api/departments/[id]/route";
const api_base_url = "http://localhost:3000/api";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: { count: 2 } }),
  })
) as any;

describe("Departments CRUD routes - /api/departments/", () => {
  beforeEach(() => {
    (fetch as any).mockClear();
  });
  test("Should Get a list of DEPT", async () => {
    /// Arrange
    const { req } = createMocks({
      url: `${api_base_url}/departments?managerId=34&page=3`,
      method: "GET",
      query: {
        managerId: 2,
        page: 1,
      },
    });

    //Act
    const response = await getOneHandler(req);

    ///Assert
    expect(response.status).toBe(200);
  });
  test("Should Get a one (DEPT)", async () => {
    /// Arrange
    const { req } = createMocks({
      url: `${api_base_url}/departments/2`,
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
  test("Should Create a Dept record", async () => {
    /// Arrange
    const dept = {
      id: "1",
      userId: "2",
      role: "employee",
      isActive: true,
      deptId: ["3"],
    };
    const { req } = createMocks({
      url: `${api_base_url}/departments`,
      method: "POST",
      body: dept,
    });

    //Act
    const response = await POST(req);

    ///Assert
    expect(response.status).toBe(201);
    expect(await response.json()).toEqual(dept);
  });

  test("Should Update a Dept record", async () => {
    /// Arrange
    const dept = {
      id: "12",
      userId: "23",
      role: "manager",
      isActive: true,
      deptId: ["3"],
    };
    const { req } = createMocks({
      url: `${api_base_url}/departments/3`,
      method: "PUT",
      body: dept,
    });

    //Act
    const response = await PUT(req);

    ///Assert
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(dept);
  });

  test("Should Delete a Dept record", async () => {
    /// Arrange
    const { req } = createMocks({
      url: `${api_base_url}/departments/1`,
      method: "DELETE",
    });

    //Act
    const response = await DELETE(req);

    ///Assert
    expect(response.status).toBe(200);
  });
});
