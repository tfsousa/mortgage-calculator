import { Request, Response } from 'express';

export class Controller {
  mortgageCalculation(req: Request, res: Response): void {
    res.send("Success!");
  }
}