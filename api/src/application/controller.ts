import { Request, Response } from 'express';
import { MortgageCalculationService } from './mortgage-calculation-service';

export class Controller {
  root(req: Request, res: Response): void {
    res.send('Success!');
  }

  mortgageCalculation(
    req: Request<{}, {}, MortgageCalculationService.Params>,
    res: Response<MortgageCalculationService.Response>
  ): void {
    try {
      const params = req.body;

      if (
        !params.amortization ||
        !params.downPayment ||
        !params.interest ||
        !params.propertyPrice ||
        !params.schedule
      ) {
        res.status(400).send({ error: 'Missing required parameters' });
        return;
      }

      const result = MortgageCalculationService.calculate(params);
      if (result.error) {
        res.status(400).send(result);
        return;
      }

      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}
