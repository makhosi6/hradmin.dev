"use client";

import { Button, Input, CardBody, Card } from "@/app/theme";
import { useForm, SubmitHandler } from "react-hook-form";

type InputFields = {
  username: string;
  password: string;
};
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFields>();

  const logIn: SubmitHandler<InputFields> = (data) => console.log(data);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="mt-6 w-96">
        <CardBody>
          <form onSubmit={handleSubmit(logIn)}>
            <div className="flex flex-col gap-6 max-w-screen-sm m-auto w-full">
              <h3>Login</h3>
              <Input
                {...register("username", { required: true })}
                color="black"
                variant="outlined"
                label="Username | Email"
                type="email"
                crossOrigin={undefined}
              />
              <Input
                {...register("password", { required: true })}
                color="black"
                variant="outlined"
                label="Password"
                type="password"
                crossOrigin={undefined}
              />
              <div>
                <span>
                  {errors.password && (
                    <span>This field is required</span>
                  )}
                </span>
              </div>
              <Button type="submit">Login</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
