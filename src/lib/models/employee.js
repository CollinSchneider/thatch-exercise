const HDHP_MIN_DEDUCTIBLE_BY_PLAN_TYPE = {
  "self-only": 1_600,
  "family": 3_200,
}

const HSA_CONTRIBUTION_LIMITS_BY_PLAN_TYPE = {
  "self-only": 4_150,
  "family": 8_300,
}

export class Employee {
  constructor({ id, name, plan, dateOfBirth, deductibleAmount }) {
    this.id = id;
    this.name = name;
    this.plan = plan;
    this.dateOfBirth = dateOfBirth;
    this.deductibleAmount = deductibleAmount;

    this.#validate();
  }

  get imageUrl() {
    return `https://api.dicebear.com/9.x/micah/svg?seed=${this.name.replace(/\s/g, '_')}`;
  }

  get isHSAEligible() {
    return this.deductibleAmount >= this.#minDeductible
  }

  get maxHSAContribution() {
    return this.#contributionLimit + this.#catchUpContributionAmount;
  }

  get formattedDateOfBirth() {
    return new Date(this.dateOfBirth).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  /////////////////////
  // private methods //
  /////////////////////

  get #minDeductible() {
    return HDHP_MIN_DEDUCTIBLE_BY_PLAN_TYPE[this.plan]
  }

  get #contributionLimit() {
    if (!this.isHSAEligible) {
      return 0;
    }
    return HSA_CONTRIBUTION_LIMITS_BY_PLAN_TYPE[this.plan]
  }

  get #catchUpContributionAmount() {
    if (this.#ageByEndOfYear < 55 || !this.isHSAEligible) {
      return 0;
    }
    return 1_000;
  }

  get #ageByEndOfYear() {
    return new Date().getFullYear() - new Date(this.dateOfBirth).getFullYear();
  }

  #validate = () => {
    if (!this.id || !this.name || !this.plan || !this.dateOfBirth || !this.deductibleAmount) {
      throw new Error('Invalid employee data provided, expected id, name, plan, dateOfBirth, deductibleAmount');
    }
    this.plan = this.plan.toLowerCase();
    if (this.plan !== 'self-only' && this.plan !== 'family') {
      throw new Error(`Invalid plan type provided, expected one of: ${Object.keys(HDHP_MIN_DEDUCTIBLE_BY_PLAN_TYPE).join(', ')}, received: ${this.plan}`);
    }
  }
}

export default Employee;