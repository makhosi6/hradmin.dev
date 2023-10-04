"use client";

import React from "react";
import { Button, Input, CardBody, Card, CardFooter } from "@/app/theme";
import { useForm, SubmitHandler } from "react-hook-form";
import { Status } from "@/app/global_types";
import { InputWithDropdown } from "@/app/components/Dropdown";

type InputFields = {
  name: string;
  manager: string;
  status: Status;
};

type Props = {
  params: {
    id: string;
  };
};

export default function Dept({params: {id}}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFields>();

  const submitHandler: SubmitHandler<InputFields> = (data) => console.log(data);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="mt-6 w-96">
        <CardBody>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col gap-6 max-w-screen-sm m-auto w-full">
              <h3>Create/Update Dept</h3>
              <Input
                {...register("name", { required: true })}
                color="black"
                variant="outlined"
                label="Name"
                type="text"
                crossOrigin={undefined}
              />
              <InputWithDropdown />
              <InputWithDropdown />
              <div>
                <span>
                  {errors.name && <span>This field is required</span>}
                </span>
              </div>
            </div>
          </form>
        </CardBody>
        <CardFooter className="flex items-center justify-end">
          <Button disabled className="mx-2" type="submit">Save</Button>
          <Button disabled className="mx-2" variant="outlined" type="submit">Cancel</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
