"use client";

import React, { useEffect } from "react";
import { Button, Input, CardBody, Card, CardFooter, Spinner } from "@/app/theme";
import { useForm, SubmitHandler } from "react-hook-form";
import { Status } from "@/app/global_types";
import { InputWithDropdown } from "@/app/components/Dropdown";

type InputFields = {
  name: string;
  // manager: string;
  input1: string;
  input2: string;
  // status: Status;
};

type Props = {
  params: {
    id: string;
  };
};

export default function Dept({ params: { id } }: Props) {
  
  const {
    register,
    handleSubmit,
    getFieldState,
    setValue,
    getValues,
    formState: { errors, dirtyFields, touchedFields },
  } = useForm<InputFields>();

  const submitHandler: SubmitHandler<InputFields> = (data) => {
    const isNameValid = (errors.name || touchedFields?.name);
    const isInput1Valid = (errors.input1 || touchedFields?.input1);
    const isInput2Valid = (errors.input2 || touchedFields?.input2);

    if (isInput1Valid && isInput2Valid && isNameValid) {
      console.log("create a dept record and show snackbar");

      //then reset the form
    } else {
      console.log("Else complain");
    }
  };

  useEffect(() => {
    console.log({ values: getValues(), dirtyFields, touchedFields, errors });
  }, [dirtyFields, touchedFields, errors, getValues]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className={"mt-6 w-96" + (!errors ? ' blur-sm ': '')} >
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
              <InputWithDropdown
                key={"input1"}
                fieldName="input1"
                registerInputs={(value) =>
                  setValue("input1", value, {
                    shouldValidate: true,
                    shouldTouch: true,
                  })
                }
                label="Label1"
                options={[
                  { value: "name1323", id: "id112" },
                  { value: "name221", id: "id222" },
                ]}
              />
              <InputWithDropdown
                key={"input2"}
                fieldName="input2"
                registerInputs={(value) =>
                  setValue("input2", value, {
                    shouldValidate: true,
                    shouldTouch: true,
                  })
                }
                label="Label 3"
                options={[
                  { value: "name1", id: "id1" },
                  { value: "name2", id: "id2" },
                ]}
              />
              <div>
                <span key={"span1"} className="mt-2 text-red-300">
                  {(errors.name || !touchedFields?.name) && (
                    <span>
                      {errors?.name?.message || "Name field is required"}
                    </span>
                  )}
                </span>
                <p key={"span2"} className="text-red-300">
                  {(errors.input1 || !touchedFields?.input1) && (
                    <span>
                      {errors?.input1?.message || "Inp1 field is required"}
                    </span>
                  )}
                </p>
                <span key={"span3"} className="mt-2 text-red-300">
                  {(errors.input2 || !touchedFields?.input2) && (
                    <span>
                      {errors?.input2?.message || "Inp2 field is required"}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </form>
        </CardBody>
        <CardFooter className="flex items-center justify-end">
          <Button
            onClick={handleSubmit(submitHandler)}
            className="mx-2"
            type="submit"
          >
            Save
          </Button>
          <Button disabled className="mx-2" variant="outlined">
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
