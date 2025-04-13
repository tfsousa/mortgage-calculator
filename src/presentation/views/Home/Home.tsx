import { Input, Select } from '~/presentation/components';
import styles from './Home.module.css';
import { Form, FormProvider, useForm } from 'react-hook-form';

type FormValues = {
  propertyPrice: number;
  downPayment: number;
  annualInterestRate: number;
  amortizationPeriod: number;
  paymentSchedule: string;
};

const AMORTIZATION_OPTIONS = [
  { label: '5 years', value: 5 },
  { label: '10 years', value: 10 },
  { label: '15 years', value: 15 },
  { label: '20 years', value: 20 },
  { label: '25 years', value: 25 },
  { label: '30 years', value: 30 },
];
const SCHEDULE_OPTIONS = [
  { label: 'Accelerated Bi-weekly', value: 'accelerated_bi_weekly' },
  { label: 'Bi-weekly', value: 'bi_weekly' },
  { label: 'Monthly', value: 'monthly' },
];

export const Home = () => {
  const methods = useForm<FormValues>({});

  const onSubmit = (data: any) => {
    console.log(data);
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
    </div>
  );
};
