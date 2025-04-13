import { z } from 'zod';

export const CalculatorSchema = z.object({
  propertyPrice: z.preprocess(
    (val: unknown) => Number(val),
    z.number().min(0, { message: 'Property price must be a positive number' })
  ) as unknown as z.ZodString,
  downPayment: z.preprocess(
    (val: unknown) => Number(val),
    z.number().min(0, { message: 'Down payment must be a positive number' })
  ) as unknown as z.ZodString,
  interest: z.preprocess(
    (val: unknown) => Number(val),
    z.number().min(0, { message: 'Interest rate must be a positive number' })
  ) as unknown as z.ZodString,
  amortization: z
    .enum(['5', '10', '15', '20', '25', '30'])
    .refine((opt) => ['5', '10', '15', '20', '25', '30'].includes(opt), {
      message: 'Invalid amortization period',
    }),
  schedule: z
    .enum(['accelerated_bi_weekly', 'bi_weekly', 'monthly'])
    .refine(
      (opt) => ['accelerated_bi_weekly', 'bi_weekly', 'monthly'].includes(opt),
      {
        message: 'Invalid payment schedule',
      }
    ),
});
