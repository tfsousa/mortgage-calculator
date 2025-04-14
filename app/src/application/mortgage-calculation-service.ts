import { httpClient, HttpClient } from '~/infra/httpClient';

export class MortgageCalculationService {
  constructor(
    private readonly httpClient: HttpClient<
      MortgageCalculationService.Params,
      MortgageCalculationService.Response
    >
  ) {}

  async request(
    params: MortgageCalculationService.Params
  ): Promise<MortgageCalculationService.Response> {
    try {
      // The post method already returns the data, not the Axios response
      const response = await this.httpClient.post(
        '/mortgage-calculation',
        params
      );

      // Just return the response directly
      return response;
    } catch (error) {
      return { error: 'An error occurred while calculating the mortgage.' };
    }
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

export const mortgageCalculationService = new MortgageCalculationService(
  httpClient
);
