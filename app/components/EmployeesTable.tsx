import {
  MagnifyingGlassIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  IconButton,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Chip,
  CardHeader,
  Tooltip,
} from "@/app/theme";
import React, { useState } from "react";
import ItemsShowPerPage from "./ItemsShowPerPage";
import { Dept, UserEmployeeProfile } from "../global_types";
import { useDeptStore } from "../store/depts";
import Link from "next/link";
import { useEmployeesStore } from "../store/employees";

const TABLE_HEAD = ["Member", "Department", "Status", "Role", "Actions"];

type Props = {
  employeesList: Array<UserEmployeeProfile>;
  getOneDept: (deptId: string) => Dept | null;
};

export function EmployeesTable({ employeesList, getOneDept }: Props) {
  const [page, setPage] = useState(1);
  const [itemsShownPerPage, setItemsShownPerPage] = useState(10);
  const { editEmployee } = useEmployeesStore();

  ///
  const OFFSET = (page - 1) * itemsShownPerPage;
  const LIMIT = OFFSET + itemsShownPerPage;
  const MAX_PAGES = Math.ceil(employeesList.length / itemsShownPerPage);
  return (
    <Card className="h-full w-full">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none overflow-visible"
      >
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row mt-2">
          <ItemsShowPerPage setItemsShownPerPage={setItemsShownPerPage} />
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              crossOrigin={undefined}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employeesList
              .sort((a, b) => (a?.createdAt || 0) - (b?.createdAt || 0))
              .filter((_empl) => _empl?.role !== "admin")
              .slice(OFFSET, LIMIT)
              .map((_empl, index) => {
                const isLast = index === employeesList.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_empl.name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {`${_empl.name} (${_empl.username})`}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {_empl.email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {getOneDept(
                            `${_empl?.employee_details.department[0]}`
                          )?.name || "Dept name"}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={
                            _empl.employee_details.isActive
                              ? "Active"
                              : "InActive"
                          }
                          color={
                            _empl.employee_details.isActive
                              ? "green"
                              : "blue-gray"
                          }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {_empl.role}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <Link href={"employees/" + _empl.userId}>
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip content="Disable/Activate User">
                        <IconButton
                          onClick={() =>
                            editEmployee({
                              ..._empl,
                              employee_details: {
                                ..._empl.employee_details,
                                isActive: !_empl.employee_details.isActive,
                              },
                            })
                          }
                          variant="text"
                        >
                          <ArchiveBoxIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {page} of {MAX_PAGES}
        </Typography>
        <div className="flex gap-2">
          <Button
            key={"prev-btn"}
            disabled={page == 1}
            onClick={() => setPage(page - 1)}
            variant="outlined"
            size="sm"
          >
            Previous
          </Button>
          <Button
            key={"next-btn"}
            disabled={page == MAX_PAGES}
            onClick={() => setPage(page + 1)}
            variant="outlined"
            size="sm"
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
