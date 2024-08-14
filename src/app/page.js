'use client'

import EmployeeDetails from "@/Components/EmployeeDetails";
import EmployeeTable from "@/Components/EmployeeTable";
import Employee from "@/lib/models/employee";
import { useEffect, useState } from "react";

const API_ENDPOINT = "https://api.airtable.com/v0/appekA493GuXz8uDK/tbllLFdZDMfLjAT4N";

export default function Home() {
  const [employees, setEmployees] = useState();
  const [employeeDetailsIsOpen, setEmployeeDetailsIsOpen] = useState(false);
  const [employeeToDisplay, setEmployeeToDisplay] = useState();

  useEffect(() => {
    fetch(API_ENDPOINT, { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_KEY}` } })
      .then((response) => response.json())
      .then(({ records: employees }) => {
        const employeeModels = employees.map(e => {
          const { Name: name, 'Plan type': plan, 'Date of birth': dateOfBirth, Deductible: deductibleAmount } = e.fields;
          return new Employee({ id: e.id, name, plan, dateOfBirth, deductibleAmount })
        })
        setEmployees(employeeModels);
      });
  }, [])

  return (
    <div className="p-8">
      <EmployeeDetails
        employee={employeeToDisplay}
        onClose={() => setEmployeeDetailsIsOpen(false)}
        isOpen={employeeDetailsIsOpen}
      />
      <EmployeeTable
        employees={employees}
        onClick={employee => {
          setEmployeeToDisplay(employee);
          setEmployeeDetailsIsOpen(true);
        }}
      />
    </div>
  );
}
