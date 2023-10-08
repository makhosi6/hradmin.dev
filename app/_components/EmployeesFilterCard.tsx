import React, { useEffect, useState } from "react";
import { Card, CardBody, Typography, CardFooter, Button } from "../_lib/theme";
import { InputWithDropdown } from "./Dropdown";
import { useForm } from "react-hook-form";
import { Status, UserEmployeeProfile } from "../_lib/global_types";
import { useDeptStore } from "../_store/depts";
import { useEmployeesStore } from "../_store/employees";
type FilterFormData = {
  status: string;
  department: string;
  manager: string;
};
type FilterFunction = (data: FilterFormData | null) => void;
type Props = {
  filter: FilterFunction;
};

export default function EmployeesFilterCard({ filter }: Props) {
  const { getAllEmployeesByEmployeesRole } = useEmployeesStore();
  const [managers, setManagers] = useState<UserEmployeeProfile[]>();
  const { departments } = useDeptStore();
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

  useEffect(() => {
    getAllEmployeesByEmployeesRole("manager")
      .then(setManagers)
      .catch(console.warn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={handleSubmit(filter)}>
      <Card>
        <CardBody>
          <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row 2xl:flex-row justify-between">
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex min-w-max pt-6"
            >
              Status
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
          <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row 2xl:flex-row justify-between">
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex min-w-max pt-6"
            >
              Department
            </Typography>
            <InputWithDropdown
              label="Department"
              fieldName={"Department"}
              onChange={(value) =>
                setValue("department", value, {
                  shouldValidate: true,
                  shouldTouch: true,
                })
              }
              options={departments.map((dept) => ({
                value: `${dept.name}`,
                id: `${dept.id}`,
              }))}
            />
          </div>
          <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row 2xl:flex-row justify-between">
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex min-w-max pt-6"
            >
              Manager
            </Typography>
            <InputWithDropdown
              label="Manager"
              onChange={(value) =>
                setValue("manager", value, {
                  shouldValidate: true,
                  shouldTouch: true,
                })
              }
              options={
                managers?.map((manager) => ({
                  value: `${manager.name} (${manager.username})`,
                  id: `${manager.userId}`,
                })) || []
              }
              fieldName={""}
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
      </Card>{" "}
    </form>
  );
}
