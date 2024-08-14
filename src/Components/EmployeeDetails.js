import { numberToCurrency } from "@/lib/helpers";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

export default function EmployeeDetails({ isOpen, employee, onClose }) {
  return (
    <Sheet
      open={isOpen}
      onOpenChange={justOpened => {
        if (!justOpened) {
          onClose();
        }
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center text-2xl">
            {employee?.imageUrl && (
              <img src={employee.imageUrl} alt={employee.name} className="w-16 h-16 rounded-full mr-4 border border-gray-200" />
            )}
            {employee?.name}
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between mt-4 space-y-2 text-sm">
          <div>
            <p className="text-gray-500">Date of Birth</p>
            <p className="font-medium">{employee?.formattedDateOfBirth}</p>
          </div>
          <div>
            <p className="text-gray-500">Plan</p>
            <p className="font-medium">{employee?.plan}</p>
          </div>
          <div>
            <p className="text-gray-500">Deductible Amount</p>
            <p className="font-medium">{employee && numberToCurrency(employee.deductibleAmount)}</p>
          </div>
          <div>
            <p className="text-gray-500">Is HSA Eligible?</p>
            <p className="font-medium">
              {employee && (
                employee.isHSAEligible ? (
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-md font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Yes
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-md font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                    No
                  </span>
                )
              )}
            </p>
          </div>
          <div>
            <p className="text-md text-gray-500">Max HSA Contribution</p>
            <p className="text-md font-medium">{employee && numberToCurrency(employee.maxHSAContribution)}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}