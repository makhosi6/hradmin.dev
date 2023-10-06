import { createMocks } from "node-mocks-http";
import { GET, POST } from "../../../app/api/users/route";
import {
  PUT,
  GET as getOneHandler,
  DELETE,
} from "../../../app/api/users/[id]/route";
const api_base_url = "http://localhost:3000/api";
describe("Users CRUD routes - /api/users/", () => {
  test("Should Get a list of Users", async () => {
    /// Arrange
    const { req } = createMocks({
      url: `${api_base_url}/users`,
      method: "GET",
    });

    //Act
    const response = await getOneHandler(req);

    ///Assert
    expect(response.status).toBe(200);
  });
  test("Should Get a one record", async () => {
    /// Arrange
    const { req } = createMocks({
      url: `${api_base_url}/users/2`,
      method: "GET",
    });

    //Act
    const response = await GET(req);

    ///Assert
    expect(response.status).toBe(200);
  });
  test("Should Create a User record", async () => {
    /// Arrange
    const user =   {
        id: "4",
        username: "john",
        name: "John",
        email: "jd@example.com",
        password: "Password123#",
      };
    const { req } = createMocks({
      url: `${api_base_url}/users`,
      method: "POST",
      body: user,
    });

    //Act
    const response = await POST(req);

    ///Assert
    expect(response.status).toBe(201);
    expect(await response.json()).toEqual(user);
  });

  test("Should Update a User record", async () => {
    /// Arrange
    const user =   {
        id: "4",
        username: "john23",
        name: "John",
        email: "jd@example.com",
        password: "Password123#",
      };
    const { req } = createMocks({
      url: `${api_base_url}/users/1`,
      method: "PUT",
      body: user,
    });

    //Act
    const response = await PUT(req);

    ///Assert
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(user);
  });

  test("Should Delete a User record", async () => {
    /// Arrange
    const { req } = createMocks({
      url: `${api_base_url}/users/1`,
      method: "DELETE",
    });

    //Act
    const response = await DELETE(req);

    ///Assert
    expect(response.status).toBe(200);
  });
});
