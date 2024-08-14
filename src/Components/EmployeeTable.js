import { numberToCurrency } from "@/lib/helpers";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";
import { useMemo, useState } from "react";

export default function EmployeeTable({ employees, onClick }) {
  const [sorting, setSorting] = useState({ key: 'name', direction: 'asc' });

  const onHeaderClick = (key) => {
    setSorting({
      key,
      direction: sorting.direction === 'asc' ? 'desc' : 'asc'
    });
  }

  const sortedEmployees = useMemo(() => {
    if (!employees) return null;

    return employees.sort((a, b) => {
      const aValue = sorting.key === 'name' ? a[sorting.key] : Number(a[sorting.key]);
      const bValue = sorting.key === 'name' ? b[sorting.key] : Number(b[sorting.key]);

      if (aValue > bValue) return sorting.direction === 'asc' ? 1 : -1;
      if (aValue < bValue) return sorting.direction === 'asc' ? -1 : 1;
      return 0;
    });
  }, [employees, sorting]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            onClick={() => onHeaderClick('name')}
            className="group cursor-pointer hover:text-gray-900 hover:bg-gray-100 transition-colors duration-300"
          >
            <span className="group-hover:underline decoration-dotted">Employee</span>
            <span className={`ml-2 ${sorting?.key === 'name' ? 'opacity-100' : 'opacity-0'}`}>
              {sorting.direction === 'asc' ? <>↑</> : <>↓</>}
            </span>
          </TableHead>
          <TableHead
            onClick={() => onHeaderClick('isHSAEligible')}
            className="group cursor-pointer hover:text-gray-900 hover:bg-gray-100 transition-colors duration-300"
          >
            <span className="group-hover:underline decoration-dotted">Is HSA Eligible?</span>
            <span className={`ml-2 ${sorting?.key === 'isHSAEligible' ? 'opacity-100' : 'opacity-0'}`}>
              {sorting.direction === 'asc' ? <>↑</> : <>↓</>}
            </span>
          </TableHead>
          <TableHead
            onClick={() => onHeaderClick('maxHSAContribution')}
            className="group cursor-pointer hover:text-gray-900 hover:bg-gray-100 transition-colors duration-300"
          >
            <span className="group-hover:underline decoration-dotted">Max HSA Deductible</span>
            <span className={`ml-2 ${sorting?.key === 'maxHSAContribution' ? 'opacity-100' : 'opacity-0'}`}>
              {sorting.direction === 'asc' ? <>↑</> : <>↓</>}
            </span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedEmployees
          ? (
            sortedEmployees.map((employee) => (
              <TableRow
                key={employee.id}
                className="group cursor-pointer"
                onClick={() => onClick(employee)}
              >
                <TableCell>
                  <img
                    src={employee.imageUrl}
                    alt={employee.name}
                    className="w-8 h-8 rounded-full inline-block mr-2 border border-gray-200"
                  />
                  <span className="font-medium group-hover:underline">
                    {employee.name}
                  </span>
                </TableCell>
                <TableCell>
                  {employee.isHSAEligible ? (
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Yes
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                      No
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {numberToCurrency(employee.maxHSAContribution)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            Array.from({ length: 20 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell className="flex items-center">
                  <div className="w-8 h-8 rounded-full inline-block mr-2 bg-gray-200 animate-pulse" />
                  <div className="h-6 w-20 inline-block bg-gray-200 animate-pulse rounded-md" />
                </TableCell>
                <TableCell>
                  <div className="h-6 w-10 rounded-md bg-gray-200 animate-pulse" />
                </TableCell>
                <TableCell>
                  <div className="h-6 w-12 bg-gray-200 animate-pulse rounded-md" />
                </TableCell>
              </TableRow>
            ))
          )
        }
      </TableBody>
    </Table>
  )
}