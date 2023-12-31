"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, CardBody, Card, CardFooter } from "@/app/_lib/theme";
import { useForm, SubmitHandler } from "react-hook-form";
import { Status, Role, UserEmployeeProfile } from "@/app/_lib/global_types";
import { InputWithDropdown } from "@/app/_components/Dropdown";
import { useEmployeesStore } from "@/app/_store/employees";
import { useUserStore } from "@/app/_store/current-user";
import { useRouter } from "next/navigation";
import { useSnackbarController } from "@/app/_store/snackbar";

type InputFields = {
  name: string;
  username: string;
  phoneNumber: string;
  email: string;
  role: string;
  manager: string | undefined;
  status: string;
};

type Props = {
  params: {
    id: string;
  };
};

export default function Employee({ params: { id } }: Props) {
  const router = useRouter();
  const [defaultValues, setDefaultValues] = useState<
    UserEmployeeProfile | undefined
  >(undefined);
  const [managers, setManagers] = useState<UserEmployeeProfile[]>([]);
  const [emailError, setEmailError] = useState<string | null>(null);
  const {
    getAllEmployeesByEmployeesRole,
    createEmployee,
    editEmployee,
    getEmployee,
  } = useEmployeesStore();
  const { isLoadingData, employees } = useEmployeesStore();
  const { showSnackBar } = useSnackbarController();
  const { validateEmail, currentUser } = useUserStore();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm<InputFields>({
    defaultValues: {
      status: Status.active,
    },
  });

  useEffect(() => {
    if (id !== "new")
      setDefaultValues(employees.filter((empl) => empl.userId === id)[0]);

    getAllEmployeesByEmployeesRole("manager")
      .then(setManagers)
      .catch(console.warn);
    trigger();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler: SubmitHandler<InputFields> = async (data) => {
    if (isValid) {
      const manager = managers.filter(
        (manager) => manager.userId === data.manager
      );

      const dept =
        manager.length > 0 ? manager[0].employee_details.department : [];

      const values = getValues();
      if (defaultValues) {
        await editEmployee({
          ...defaultValues,
          userId: defaultValues.userId,
          username: values.username,
          name: values.name,
          phoneNumber: values.phoneNumber,
          email: values.email,
          role: values.role,
          employee_details: {
            createdAt: defaultValues.employee_details?.createdAt,
            employee_id: defaultValues.employee_details.employee_id,
            department: dept ?? defaultValues.employee_details.department,
            isActive: values.status == Status.active,
          },
          createdAt: defaultValues.createdAt,
        });
      } else {
        await createEmployee({
          username: data.username,
          name: data.name,
          email: data.email,
          role: data.role,
          password: "",
          employee_details: {
            department: dept,
            isActive: Status.active === data.status,
          },
          phoneNumber: data.phoneNumber,
        });
      }
      showSnackBar({
        message: "Employee created/updated (" + data.email + ")",
        show: true,
        snackBarTheme: "success",
      });
      reset();
    }
  };
  useEffect(() => {
    const subscription = watch((data) => {
      if (data?.email) {
        validateEmail(data.email)
          .then((isEmailValid) => {
            if (!isEmailValid) {
              setEmailError(
                `Sorry! this email is already used (${data.email})`
              );
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
                {...register("name", {
                  required: true,
                })}
                defaultValue={defaultValues?.name}
                color="black"
                variant="outlined"
                label="Name"
                type="text"
                crossOrigin={undefined}
              />
              <Input
                key="username"
                defaultValue={defaultValues?.username}
                {...register("username", { required: true })}
                color="black"
                variant="outlined"
                label="Username"
                type="text"
                crossOrigin={undefined}
              />
              <Input
                key="email"
                defaultValue={defaultValues?.email}
                {...register("email", { required: true })}
                color="black"
                variant="outlined"
                label="Email"
                type="email"
                crossOrigin={undefined}
              />
              <Input
                key="phoneNumber"
                {...register("phoneNumber", { required: true, minLength: 10 })}
                defaultValue={defaultValues?.phoneNumber}
                color="black"
                variant="outlined"
                label="Phone Number"
                type="number"
                minLength={10}
                crossOrigin={undefined}
              />
              <InputWithDropdown
                key="role"
                defaultValue={defaultValues?.role}
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
                fieldName="Manager (optional)"
                onChange={(value) =>
                  setValue("manager", value, {
                    shouldValidate: true,
                    shouldTouch: true,
                  })
                }
                label="Manager (optional)"
                options={[...managers, currentUser].map((manager) => {
                  return {
                    value: `${manager?.name} (${manager?.username})`,
                    id: `${manager?.userId}`,
                  };
                })}
              />
              {defaultValues && (
                <InputWithDropdown
                  key="status"
                  fieldName="Status"
                  defaultValue={
                    defaultValues?.employee_details.isActive
                      ? Status.active
                      : Status.inactive
                  }
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
                  {(emailError || !isValid) && (
                    <span>
                      {" "}
                      {emailError ||
                        "All fields are required | phone should be 10 digits long"}
                    </span>
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
          <Button onClick={() => {}} className="mx-2" variant="outlined">
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
