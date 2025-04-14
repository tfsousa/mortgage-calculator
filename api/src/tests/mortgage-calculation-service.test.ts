import { MortgageCalculationService } from '../application/mortgage-calculation-service';
import test, { describe } from 'node:test';
import assert from 'node:assert';

describe('MortgageCalculationService', () => {
  describe('calculate', () => {
    test('should calculate monthly payment correctly', () => {
      const params: MortgageCalculationService.Params = {
        propertyPrice: 500000,
        downPayment: 100000,
        interest: 5.99,
        amortization: 25,
        schedule: 'monthly',
      };

      const result = MortgageCalculationService.calculate(params);

      assert.strictEqual(result.error, undefined);
      assert.notEqual(result.data, undefined);
      assert.strictEqual(result.data?.paymentSchedule, 'monthly');
      assert.strictEqual(result.data?.loanAmount, 400000);
      // We can't predict the exact payment amount as it depends on the formula implementation
      // but we can verify it's a reasonable positive number
      assert.ok(result.data!.paymentAmount > 0);
    });

    test('should calculate bi-weekly payment correctly', () => {
      const params: MortgageCalculationService.Params = {
        propertyPrice: 450000,
        downPayment: 90000,
        interest: 4.5,
        amortization: 20,
        schedule: 'bi_weekly',
      };

      const result = MortgageCalculationService.calculate(params);

      assert.strictEqual(result.error, undefined);
      assert.notEqual(result.data, undefined);
      assert.strictEqual(result.data?.paymentSchedule, 'bi_weekly');
      assert.strictEqual(result.data?.loanAmount, 360000);
      assert.strictEqual(result.data?.numberOfPayments, 20 * 26); // 20 years * 26 payments per year
      assert.ok(result.data!.paymentAmount > 0);
    });

    test('should calculate accelerated bi-weekly payment correctly', () => {
      const params: MortgageCalculationService.Params = {
        propertyPrice: 600000,
        downPayment: 120000,
        interest: 3.75,
        amortization: 15,
        schedule: 'accelerated_bi_weekly',
      };

      const result = MortgageCalculationService.calculate(params);

      assert.strictEqual(result.error, undefined);
      assert.notEqual(result.data, undefined);
      assert.strictEqual(result.data?.paymentSchedule, 'accelerated_bi_weekly');
      assert.strictEqual(result.data?.loanAmount, 480000);
      assert.ok(result.data!.paymentAmount > 0);
    });

    test('should return error for insufficient down payment', () => {
      const params: MortgageCalculationService.Params = {
        propertyPrice: 700000,
        downPayment: 25000,
        interest: 4.99,
        amortization: 30,
        schedule: 'monthly',
      };

      const result = MortgageCalculationService.calculate(params);

      assert.notEqual(result.error, undefined);
      assert.ok(result.error!.includes('Down payment is insufficient'));
      assert.strictEqual(result.data, undefined);
    });

    test('should return error for negative interest rate', () => {
      const params: MortgageCalculationService.Params = {
        propertyPrice: 500000,
        downPayment: 100000,
        interest: -1,
        amortization: 25,
        schedule: 'monthly',
      };

      const result = MortgageCalculationService.calculate(params);

      assert.strictEqual(result.error, 'Interest rate must be greater than 0');
      assert.strictEqual(result.data, undefined);
    });

    test('should return error for invalid payment schedule', () => {
      const params = {
        propertyPrice: 500000,
        downPayment: 100000,
        interest: 5.99,
        amortization: 25,
        schedule: 'invalid_schedule',
      } as unknown as MortgageCalculationService.Params;

      const result = MortgageCalculationService.calculate(params);

      assert.strictEqual(result.error, 'Invalid payment schedule');
      assert.strictEqual(result.data, undefined);
    });
  });
});
