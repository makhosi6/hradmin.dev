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
import { Dept, Status, UserEmployeeProfile } from "@/app/global_types";
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

export default function DeptPage({ params: { id } }: Props) {
  const [defaultValues, setDefaultValues] = useState<Dept | undefined>(
    undefined
  );
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
    trigger,
    formState: { errors, isValid, dirtyFields, touchedFields },
  } = useForm<InputFields>({
    defaultValues: {
      status: Status.active,
    },
  });

  const submitHandler: SubmitHandler<InputFields> = async (data) => {
    if (isValid) {
      /// TODO:
      console.log("create a dept record and show snackbar");
      const { name, status, manager: manager_id } = getValues();
      await createDept({
        name,
        status,
        manager_id,
      });
      reset();
    } else {
      console.log("Else complain");
    }
  };
  useEffect(() => {
    if (id !== "new")
      setDefaultValues(departments.filter((_dept) => _dept.id === id)[0]);

    getAllEmployeesByEmployeesRole("manager")
      .then(setManagers)
      .catch(console.warn);

    trigger();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              {defaultValues && (
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
                    {
                      value: Status.inactive.toUpperCase(),
                      id: Status.inactive,
                    },
                  ]}
                />
              )}
              <div>
                <p key={"errors"} className="mt-2 text-red-300">
                  {!isValid && <span> {"All fields are required"}</span>}
                </p>
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
