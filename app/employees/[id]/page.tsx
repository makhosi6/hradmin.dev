"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, CardBody, Card, CardFooter } from "@/app/theme";
import { useForm, SubmitHandler } from "react-hook-form";
import { Status, Role, UserEmployeeProfile } from "@/app/global_types";
import { InputWithDropdown } from "@/app/components/Dropdown";
import { useEmployeesStore } from "@/app/store/employees";
import { useDeptStore } from "@/app/store/depts";
import { useUserStore } from "@/app/store/current-user";

type InputFields = {
  name: string;
  username: string;
  phoneNumber: string;
  email: string;
  role: string;
  manager: string;
  status: string;
};

type Props = {
  params: {
    id: string;
  };
};

export default function Employee({ params: { id } }: Props) {
  const [managers, setManagers] = useState<UserEmployeeProfile[]>([]);
  const [emailError, setEmailError] = useState<string | null>(null);
  const { getAllEmployeesByEmployeesRole, createEmployee } =
    useEmployeesStore();
  const { isLoadingData } = useEmployeesStore();
  const { validateEmail } = useUserStore();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors, isValid, dirtyFields, touchedFields },
  } = useForm<InputFields>();

  useEffect(() => {
    getAllEmployeesByEmployeesRole("manager")
      .then(setManagers)
      .catch(console.warn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler: SubmitHandler<InputFields> = async (data) => {
    if (isValid) {
      const manager = managers.filter(
        (manager) => manager.userId === data.manager
      );

      const dept =
        manager.length > 0 ? manager[0].employee_details.department : [];

      await createEmployee({
        username: data.username,
        name: data.name,
        email: data.email,
        role: data.role,
        employee_details: {
          department: dept,
          isActive: Status.active === data.status,
        },
      });

      reset();
    }
  };
  useEffect(() => {
    const subscription = watch((data) => {
      console.log({ DATA: data });
      if (data?.email) {
        validateEmail(data.email)
          .then((isEmailValid) => {
            console.log({ isEmailValid });

            if (!isEmailValid) {
              setEmailError(`Sorry! this email is already used (${data.email})`);
            } else {
              setEmailError(null);
            }
          })
          .catch(console.warn);
      }
    });
    return () => subscription.unsubscribe();
  }, [validateEmail, watch]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className={"mt-6 w-96" + (isLoadingData ? " blur-sm " : "")}>
        <CardBody>
          <form>
            <div className="flex flex-col gap-6 max-w-screen-sm m-auto w-full">
              <h3>Create/Update Employee</h3>
              <Input
                key="name"
                {...register("name", { required: true })}
                color="black"
                variant="outlined"
                label="Name"
                type="text"
                crossOrigin={undefined}
              />
              <Input
                key="username"
                {...register("username", { required: true })}
                color="black"
                variant="outlined"
                label="Username"
                type="text"
                crossOrigin={undefined}
              />
              <Input
                key="email"
                {...register("email", { required: true })}
                color="black"
                variant="outlined"
                label="Email"
                type="email"
                crossOrigin={undefined}
              />
              <Input
                key="phoneNumber"
                {...register("phoneNumber", { required: true })}
                color="black"
                variant="outlined"
                label="Phone Number"
                type="number"
                minLength={10}
                crossOrigin={undefined}
              />
              <InputWithDropdown
                key="role"
                fieldName="Role"
                onChange={(value) =>
                  setValue("role", value, {
                    shouldValidate: true,
                    shouldTouch: true,
                  })
                }
                label="Role"
                options={[
                  { value: Role.employee.toUpperCase(), id: Role.employee },
                  { value: Role.manager.toUpperCase(), id: Role.manager },
                  { value: Role.admin.toUpperCase(), id: Role.admin },
                  { value: Role.other.toUpperCase(), id: Role.other },
                ]}
              />
              <InputWithDropdown
                key="manager"
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
                key="status"
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
                <p key={"errors"} className="mt-2 text-red-300">
                  {(emailError || errors.name || !isValid) && (
                    <span> {emailError || "All fields are required"}</span>
                  )}
                </p>
              </div>
            </div>
          </form>
        </CardBody>
        <CardFooter className="flex items-center justify-end">
          <Button
            disabled={isLoadingData || !isValid || emailError != null}
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
