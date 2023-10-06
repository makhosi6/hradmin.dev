import {
  MagnifyingGlassIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  Tooltip,
  Select,
  Option,
} from "@/app/theme";
import React, { useEffect, useState } from "react";
import ItemsShowPerPage from "./ItemsShowPerPage";
import { Dept, UserEmployeeProfile } from "../global_types";
import { statusAsBool } from "../helpers";
import { employees } from "../api/data";
import { useEmployeesStore } from "../store/employees";

const TABLE_HEAD = ["#", "Name", "Status", "Manager", "Actions"];

type Props = {
  filteredDeptList: Array<Dept>;
  managers: Array<UserEmployeeProfile>
};

export function DeptTable({ filteredDeptList, managers }: Props) {


  function getManager(id: string): UserEmployeeProfile | null {
    const manager = managers.filter((_manager) => _manager.userId === id);
    return manager.length > 0 ? manager[0] : null;
  }
  console.log({ filteredDeptList });

  return (
    <Card className="h-full w-full">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none overflow-visible"
      >
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row mt-2">
          <ItemsShowPerPage />
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
            {filteredDeptList.map(({ id, name, status, manager_id }, index) => {
              const isLast = index === filteredDeptList.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";
              const manager = getManager(`${manager_id}`);
              return (
                <tr key={id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index + 1}
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
                        {name}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={statusAsBool(status) ? "ACTIVE" : "INACTIVE"}
                        color={statusAsBool(status) ? "green" : "blue-gray"}
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {`${manager?.name} (${manager?.username}) ${manager_id}`}
                    </Typography>

                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {`${manager?.email})`}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Edit User">
                      <IconButton variant="text">
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Disable User">
                      <IconButton variant="text">
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
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
