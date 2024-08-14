import Employee from './employee';

describe('Employee', () => {
  let employee;
  describe('#constructor', () => {
    test("it should throw an error when one of the required properties is missing", () => {
      expect(() => {
        employee = new Employee({
          id: "1",
          name: "John Doe",
          plan: "self-only",
          deductibleAmount: 1600,
        });
      }).toThrow("Invalid employee data provided, expected id, name, plan, dateOfBirth, deductibleAmount");
    });

    test("it should throw an error when the plan does not equal 'self-only' or 'family'", () => {
      expect(() => {
        employee = new Employee({
          id: "1",
          name: "John Doe",
          plan: "foo-bar",
          dateOfBirth: "1990-01-01",
          deductibleAmount: 1600,
        });
      }).toThrow("Invalid plan type provided, expected one of: self-only, family, received: foo-bar");
    });

    test("should initialize an employee with the correct properties", () => {
      employee = new Employee({
        id: "1",
        name: "John Doe",
        plan: "self-only",
        dateOfBirth: "1990-01-01",
        deductibleAmount: 1600,
      });
      expect(employee.id).toBe("1");
      expect(employee.name).toBe("John Doe");
      expect(employee.plan).toBe("self-only");
      expect(employee.dateOfBirth).toBe("1990-01-01");
      expect(employee.deductibleAmount).toBe(1600);
    });

    test("should initialize an employee with the `plan` attribute normalized to all lowercase", () => {
      employee = new Employee({
        id: "1",
        name: "John Doe",
        plan: "SELF-ONLY",
        dateOfBirth: "1990-01-01",
        deductibleAmount: 1600,
      });
      expect(employee.plan).toBe("self-only");
    });
  });

  describe('#isHSAEligible', () => {
    test("should return true if the deductible amount is greater than or equal to the minimum deductible amount for the `self-only` plan ($1,600)", () => {
      employee = new Employee({
        id: "1",
        name: "John Doe",
        plan: "self-only",
        dateOfBirth: "1990-01-01",
        deductibleAmount: 1600,
      });
      expect(employee.isHSAEligible).toBe(true);
    });

    test("should return false if the deductible amount is less than the minimum deductible amount for the `self-only` plan ($1,600)", () => {
      employee = new Employee({
        id: "1",
        name: "John Doe",
        plan: "self-only",
        dateOfBirth: "1990-01-01",
        deductibleAmount: 1500,
      });
      expect(employee.isHSAEligible).toBe(false);
    });

    test("should return true if the deductible amount is greater than or equal to the minimum deductible amount for the `family` plan ($3,200)", () => {
      employee = new Employee({
        id: "1",
        name: "John Doe",
        plan: "family",
        dateOfBirth: "1990-01-01",
        deductibleAmount: 3200,
      });
      expect(employee.isHSAEligible).toBe(true);
    });

    test("should return false if the deductible amount is less than the minimum deductible amount for the `family` plan ($3,200)", () => {
      employee = new Employee({
        id: "1",
        name: "John Doe",
        plan: "family",
        dateOfBirth: "1990-01-01",
        deductibleAmount: 3100,
      });
      expect(employee.isHSAEligible).toBe(false);
    });
  });

  describe('#maxHSAContribution', () => {
    // an employee born December 10, 1968 who has a family plan with a $3,700 deductible is eligible for an HSA and has an HSA max contribution of $9,300 ($8,300 contribution limit + $1,000 catch up).
    test("should return the correct max HSA contribution for an employee who is 55 or older", () => {
      employee = new Employee({
        id: "1",
        name: "John Doe",
        plan: "family",
        dateOfBirth: "1969-12-10",
        deductibleAmount: 3700,
      });
      expect(employee.maxHSAContribution).toBe(9300);
    });

    // An employee born November 9, 1990 who has a self-only plan with a $250 deductible is not eligible for an HSA.
    test("should return 0 if the employee is not eligible for an HSA", () => {
      employee = new Employee({
        id: "1",
        name: "John Doe",
        plan: "self-only",
        dateOfBirth: "1990-11-09",
        deductibleAmount: 250,
      });
      expect(employee.maxHSAContribution).toBe(0);
    });
  });
});
