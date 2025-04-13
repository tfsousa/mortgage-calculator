import { Input, Select } from '~/presentation/components';
import styles from './Home.module.css';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { CalculatorSchema } from '~/presentation/validation/form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AMORTIZATION_OPTIONS,
  SCHEDULE_OPTIONS,
} from '~/domain/calculator-models';

type FormValues = {
  propertyPrice: string;
  downPayment: string;
  interest: string;
  amortization: '5' | '10' | '15' | '20' | '25' | '30';
  schedule: 'accelerated_bi_weekly' | 'bi_weekly' | 'monthly';
};

export const Home = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(CalculatorSchema),
  });

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
