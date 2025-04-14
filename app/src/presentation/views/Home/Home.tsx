import { Input, Select } from '~/presentation/components';
import styles from './Home.module.css';
import {
  Form,
  FormProvider,
  FormSubmitHandler,
  useForm,
} from 'react-hook-form';
import { CalculatorSchema } from '~/presentation/validation/form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AMORTIZATION_OPTIONS,
  SCHEDULE_OPTIONS,
} from '~/domain/calculator-models';
import {
  MortgageCalculationService,
  mortgageCalculationService,
} from '~/application/mortgage-calculation-service';
import { useState } from 'react';
import { currencyConverter } from './utils';

type FormValues = {
  propertyPrice: string;
  downPayment: string;
  interest: string;
  amortization: '5' | '10' | '15' | '20' | '25' | '30';
  schedule: 'accelerated_bi_weekly' | 'bi_weekly' | 'monthly';
};

export const Home = () => {
  const [result, setResult] = useState<
    MortgageCalculationService.Response | undefined
  >();
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(CalculatorSchema),
  });

  const onSubmit: FormSubmitHandler<FormValues> = ({ data }) => {
    setLoading(true);
    setError(undefined);
    setResult(undefined);
    mortgageCalculationService
      .request({
        propertyPrice: Number(data.propertyPrice),
        downPayment: Number(data.downPayment),
        interest: Number(data.interest),
        amortization: Number(
          data.amortization
        ) as MortgageCalculationService.Params['amortization'],
        schedule: data.schedule,
      })
      .then((response) => {
        if (response.error) {
          setError(response.error);
          setResult(undefined);
          console.error(response.error);
        } else {
          console.log('Mortgage calculation result:', response.data);
          setResult(response);
          setError(undefined);
        }
      })
      .catch((error) => {
        console.error('Error during mortgage calculation:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mortgage Calculator</h1>
      <FormProvider {...methods}>
        <Form
          className={styles.fieldsWrapper}
          control={methods.control}
          onSubmit={onSubmit}
        >
          <Input
            label="Property Price"
            name="propertyPrice"
            type="number"
            format="currency"
          />
          <Input
            label="Down Payment"
            name="downPayment"
            type="number"
            format="currency"
          />
          <Input
            label="Annual Interest Rate"
            name="interest"
            type="number"
            format="percentage"
          />
          <Select
            placeholder="Amortization Period"
            name="amortization"
            options={AMORTIZATION_OPTIONS}
          />
          <Select
            placeholder="Payment Schedule"
            name="schedule"
            options={SCHEDULE_OPTIONS}
          />
          <button type="submit" className={styles.submitButton}>
            Calculate
          </button>
        </Form>
      </FormProvider>
      <div className={styles.resultWrapper}>
        {loading && <p>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {result?.data && (
          <div className={styles.result}>
            <h2>Calculation Result</h2>
            <p>
              Payment Amount: {currencyConverter(result.data?.paymentAmount)}
            </p>
            <p>Payment Schedule: {result.data?.paymentSchedule}</p>
            <p>Number of Payments: {result.data?.numberOfPayments}</p>
            <p>Total Cost: {currencyConverter(result.data?.totalCost)}</p>
            <p>Loan Amount: {currencyConverter(result.data?.loanAmount)}</p>
            <p>Interest Rate: {result.data?.interestRate}%</p>
            <p>Amortization Period: {result.data?.amortizationPeriod}</p>
            <p>
              Minimum Down Payment:{' '}
              {currencyConverter(result.data?.minDownPayment)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
