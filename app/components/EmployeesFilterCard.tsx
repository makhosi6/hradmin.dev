import React from "react";
import { Card, CardBody, Typography, CardFooter, Button } from "../theme";
import { InputWithDropdown } from "./Dropdown";

export default function EmployeesFilterCard() {
  return (
    <Card>
      <CardBody>
        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row 2xl:flex-row justify-around">
          <Typography
            variant="h6"
            color="blue-gray"
            className="flex min-w-max pt-6"
          >
            Title
          </Typography>
          {/* <InputWithDropdown label="Label1"  
      
      options={[
        { value: "name1", id: "id1" },
        { value: "name2", id: "id2" },
      ]}
      />
       */}
        </div>
        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row 2xl:flex-row justify-around">
          <Typography
            variant="h6"
            color="blue-gray"
            className="flex min-w-max pt-6"
          >
            Title
          </Typography>
          {/* <InputWithDropdown label="Label1"  
              options={[
                { value: "name1", id: "id1" },
                { value: "name2", id: "id2" },
              ]}
        /> */}
        </div>
        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row 2xl:flex-row justify-around">
          <Typography
            variant="h6"
            color="blue-gray"
            className="flex min-w-max pt-6"
          >
            Title
          </Typography>
          {/* <InputWithDropdown  label="Label1" 
              options={[
                { value: "name1", id: "id1" },
                { value: "name2", id: "id2" },
              ]}
        /> */}
        </div>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Button>Filter</Button>
      </CardFooter>
    </Card>
  );
}
