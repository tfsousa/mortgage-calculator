export class MortgageCalculationService {
  static calculate(
    params: MortgageCalculationService.Params
  ): MortgageCalculationService.Response {
    const { propertyPrice, downPayment, interest, amortization, schedule } =
      params;

    // Minimum down payment, source: https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html
    // 5% for first $500,000, 10% for the portion above $500,000
    const minDownPayment =
      propertyPrice <= 500000
        ? propertyPrice * 0.05
        : 500000 * 0.05 + (propertyPrice - 500000) * 0.1;

    if (downPayment < minDownPayment) {
      return {
        error: `Down payment is insufficient. Minimum required: $${minDownPayment.toFixed(2)}`,
      };
    }

    const loanAmount = propertyPrice - downPayment;

    if (interest <= 0) {
      return { error: 'Interest rate must be greater than 0' };
    }

    if (loanAmount <= 0) {
      return { error: 'Loan amount must be greater than 0' };
    }

    // Calculate monthly interest rate (convert annual percentage to monthly decimal)
    const monthlyInterestRate = interest / 100 / 12;

    let numberOfPayments: number;
    let paymentFactor: number;

    switch (schedule) {
      case 'monthly':
        numberOfPayments = amortization * 12;
        paymentFactor = 1; // 1 payment per month
        break;
      case 'bi_weekly':
        numberOfPayments = amortization * 26; // 26 payments per year
        paymentFactor = 12 / 26; // Adjustment for bi-weekly payments
        break;
      case 'accelerated_bi_weekly':
        numberOfPayments = amortization * 26; // 26 payments per year
        paymentFactor = 1 / 2; // Monthly payment ÷ 2 for accelerated bi-weekly
        break;
      default:
        return { error: 'Invalid payment schedule' };
    }

    // Calculate payment using the formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyPayment = (() => {
      const basePayment = loanAmount * monthlyInterestRate;
      if (schedule === 'monthly')
        return (
          (basePayment * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
          (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
        );

      return (
        ((basePayment * Math.pow(1 + monthlyInterestRate, amortization * 12)) /
          (Math.pow(1 + monthlyInterestRate, amortization * 12) - 1)) *
        paymentFactor
      );
    })();

    const paymentAmount = monthlyPayment;
    const totalCost = paymentAmount * numberOfPayments;

    return {
      data: {
        paymentAmount: Number(paymentAmount.toFixed(2)),
        paymentSchedule: schedule,
        numberOfPayments: numberOfPayments,
        totalCost: Number(totalCost.toFixed(2)),
        loanAmount: Number(loanAmount.toFixed(2)),
        interestRate: interest,
        amortizationPeriod: amortization,
        minDownPayment: Number(minDownPayment.toFixed(2)),
      },
    };
  }
}

export namespace MortgageCalculationService {
  export type Params = {
    propertyPrice: number;
    downPayment: number;
    interest: number;
    amortization: 5 | 10 | 15 | 20 | 25 | 30;
    schedule: 'accelerated_bi_weekly' | 'bi_weekly' | 'monthly';
  };

  export type Response = {
    error?: string;
    data?: {
      paymentAmount: number;
      paymentSchedule: string;
      numberOfPayments: number;
      totalCost: number;
      loanAmount: number;
      interestRate: number;
      amortizationPeriod: number;
      minDownPayment: number;
    };
  };
}
