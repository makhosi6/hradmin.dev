import { HEAD } from "../../../app/api/validate-email/route";
import { createMocks } from "node-mocks-http";

const api_base_url = "http://localhost:3000/api";

test("should indicate if the email address is used or not (status code of 404 or 200) ", async () => {
  /// Arrange
  const { req } = createMocks({
    url: `${api_base_url}/validate-email`,
    method: "PUT",
  });
  const { req: badReq, res } = createMocks({
    url: `${api_base_url}/validate-email?email=jj23@mail.com`,
    method: "PUT",
  });
  //Act
  const response = await HEAD(req);
  const badResponse = await HEAD(badReq);

  ///Assert
  // expect(badResponse.status).toBe(400);
  // expect(response.status).toBe(404);
  expect(response.status).toBe(200);
});
