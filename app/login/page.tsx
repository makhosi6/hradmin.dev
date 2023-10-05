"use client";

import { Button, Input, CardBody, Card, Spinner } from "@/app/theme";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import { useForm,  } from "react-hook-form";
import { useUserStore } from "../store/current-user";

type InputFields = {
  email: string;
  password: string;
};
export default function Login() {
  const router = useRouter()
  const { currentUser, logIn, isLoadingData } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<InputFields>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldUnregister: true,
  });

  useEffect(() => {
    if(currentUser != null){
      router.replace("/employees")
    }
  },[currentUser, router])

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="mt-6 w-96">
        <CardBody>
          <form onSubmit={handleSubmit(logIn)}>
            <div className="flex flex-col gap-6 max-w-screen-sm m-auto w-full">
              <h3>Login</h3>
              <Input
                {...register("email", { required: true })}
                color="black"
                variant="outlined"
                label="Email"
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
                minLength={4}
              />
              <div>
                <span className="pt-2">
                  {errors.password && <span>{errors.password?.message}</span>}
                </span>

                <span className="pt-2">
                  {errors.email && <span>{errors.email?.message}</span>}
                </span>
                <span className="pt-2">
                  {errors.root && <span>{errors.root?.message}</span>}
                </span>
              </div>
              <Button disabled={!isValid || isLoadingData} type="submit">
                {isLoadingData ? <Spinner /> : "Login"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
