import { Request, Response } from 'express';
import { MortgageCalculationService } from './mortgage-calculation-service';

export class Controller {
  root(req: Request, res: Response) {
    res.send('Success!');
  }
  mortgageCalculation(
    req: Request<{}, {}, MortgageCalculationService.Params>,
    res: Response
  ) {
    try {
      const params = req.body;

      console.log(JSON.stringify(params, null, 2));

      // Validate the parameters
      // if (!params.loanAmount || !params.interestRate || !params.loanTerm) {
      //   return res.status(400).send({ error: "Missing required parameters" });
      // }

      // Call the service with the extracted parameters
      // const result = MortgageCalculationService.calculate(params);

      // Send the result back to the client
      // res.status(200).send(result);
      res.status(200).send({
        message: 'Mortgage calculation successful',
      });
    } catch (error) {
      // Handle any errors
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}
