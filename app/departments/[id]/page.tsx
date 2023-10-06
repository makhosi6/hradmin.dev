"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  CardBody,
  Card,
  CardFooter,
  Spinner,
} from "@/app/theme";
import { useForm, SubmitHandler } from "react-hook-form";
import { Status, UserEmployeeProfile } from "@/app/global_types";
import { InputWithDropdown } from "@/app/components/Dropdown";
import { useDeptStore } from "@/app/store/depts";
import { useEmployeesStore } from "@/app/store/employees";

type InputFields = {
  name: string;
  manager: string;
  status: string;
};

type Props = {
  params: {
    id: string;
  };
};

export default function Dept({ params: { id } }: Props) {
  const [managers, setManagers] = useState<UserEmployeeProfile[]>([]);
  const { departments, isLoadingData, createDept, updateDept } = useDeptStore();
  const { getAllEmployeesByEmployeesRole } = useEmployeesStore();
  const {
    register,
    reset,
    handleSubmit,
    getFieldState,
    setValue,
    getValues,
    formState: { errors, isValid, dirtyFields, touchedFields },
  } = useForm<InputFields>();

  const submitHandler: SubmitHandler<InputFields> = async (data) => {
    if (isValid) {
      console.log("create a dept record and show snackbar");
      const { name, status, manager: manager_id } = getValues();
      await createDept({
        name,
        status,
        manager_id,
      });
      reset()
    } else {
      console.log("Else complain");
    }
  };
  useEffect(() => {
    getAllEmployeesByEmployeesRole("manager")
      .then(setManagers)
      .catch(console.warn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log({ values: getValues(), dirtyFields, touchedFields, errors });
  }, [dirtyFields, touchedFields, errors, getValues]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className={"mt-6 w-96" + (isLoadingData ? " blur-sm " : "")}>
        <CardBody>
          <form>
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
                key={"Manager"}
                fieldName="Manager"
                onChange={(value) =>
                  setValue("manager", value, {
                    shouldValidate: true,
                    shouldTouch: true,
                  })
                }
                label="Manager"
                options={managers.map((manager) => {
                  return {
                    value: `${manager.name} ${manager.username} (${manager.userId})`,
                    id: `${manager.userId}`,
                  };
                })}
              />
              <InputWithDropdown
                key={"status"}
                fieldName="Status"
                onChange={(value) =>
                  setValue("status", value, {
                    shouldValidate: true,
                    shouldTouch: true,
                  })
                }
                label="Status"
                options={[
                  { value: Status.active.toUpperCase(), id: Status.active },
                  { value: Status.inactive.toUpperCase(), id: Status.inactive },
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
                  {(errors.manager || !touchedFields?.manager) && (
                    <span>
                      {errors?.manager?.message || "Manager field is required"}
                    </span>
                  )}
                </p>
                <span key={"span3"} className="mt-2 text-red-300">
                  {(errors.status || !touchedFields?.status) && (
                    <span>
                      {errors?.status?.message?.toString() ||
                        "Status field is required"}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </form>
        </CardBody>
        <CardFooter className="flex items-center justify-end">
          <Button
            disabled={isLoadingData || !isValid}
            onClick={handleSubmit(submitHandler)}
            className="mx-2"
            type="submit"
          >
            Save
          </Button>
          <Button onClick={() => reset()} className="mx-2" variant="outlined">
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
