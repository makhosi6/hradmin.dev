import { aggregateUserEmployeeProfile, employees } from "./../data";
import bcrypt from "bcrypt";
import { usersCollection, employeesCollection } from "../db";

export async function POST(request: Request) {
  const { password, email } = await request.json();

  if (!password || !email) {
    return Response.json(
      {
        success: false,
        message: "Bad Request",
      },
      { status: 400 }
    );
  }

  /// user // get user from DB
  const userData = await usersCollection()
    .find({ email }, { projection: { _id: 0 } } as any)
    .toArray();
  const user = userData.length > 0 ? (userData[0] as any) : null;

  if (!bcrypt.compareSync(password, user?.password) || !user) {
    return Response.json(
      {
        success: false,
        message: "Authentication error: incorrect email/password",
      },
      { status: 200 }
    );
  }

  // also get employee
  const employeeData = await employeesCollection()
    .find({ userId: user?.id }, { projection: { _id: 0 } } as any)
    .toArray();
  const employee = employeeData[0] as any;

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
