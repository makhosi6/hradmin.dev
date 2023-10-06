import { aggregateUserEmployeeProfile, employees } from "./../data";
import { fetchWrapper } from "@/app/helpers";
import { users } from "../data";

export async function POST(request: Request) {
  const { password, email , } = await request.json();

  if (!password || !email) {
    return Response.json(
      {
        success: false,
        message: "Bad Request",
      },
      { status: 201 }
    );
  }
  /// user // get user from DB
  const user = users[2];

  // also get employee
  const employee = employees[2];

  return Response.json(
    {
      success: true,
      message: "Authentication successful",
      token: `access_token_${Math.floor(Math.random() * 1000)}`,
      userProfile: aggregateUserEmployeeProfile({ user, employee }),
    },
    { status: 200 }
  );
}
