"use client";
import React from "react";
import { Card, CardBody, Typography, CardFooter, Button } from "../theme";
import { InputWithDropdown } from "./Dropdown";
import { Status } from "../global_types";
import { useForm } from "react-hook-form";

type FilterFormData = {
  status: string;
};
type FilterFunction = (data: FilterFormData | null) => void;
type Props = {
  filter: FilterFunction;
};
export default function DeptFilterCard({ filter }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
    reset,
  } = useForm<FilterFormData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldUnregister: true,
  });
  return (
    <Card>
      <form onSubmit={handleSubmit(filter)}>
        <CardBody>
          <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row 2xl:flex-row justify-around">
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex min-w-max pt-6"
            >
              Manager
            </Typography>

            <InputWithDropdown
              label="Status"
              onChange={(value) =>
                setValue("status", value, {
                  shouldValidate: true,
                  shouldTouch: true,
                })
              }
              options={[
                {
                  value: Status.active.toUpperCase() + " ONLY",
                  id: Status.active,
                },
                {
                  value: Status.inactive.toUpperCase() + " ONLY",
                  id: Status.inactive,
                },
              ]}
              fieldName="Status"
            />
          </div>
        </CardBody>
        <CardFooter className="flex justify-center gap-7 pt-2">
          <Button type="submit">Filter</Button>
          <Button
            onClick={() => {
              reset();
              filter(null);
            }}
            className="mx-2"
            variant="outlined"
          >
            Reset
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
