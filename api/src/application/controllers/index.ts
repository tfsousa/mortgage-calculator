import { Request, Response } from 'express';

export class Controller {
  root(req: Request, res: Response) {
    res.send("Success!");
  }
  mortgageCalculation(req: Request, res: Response) {
    res.send("Success!");
  }
}