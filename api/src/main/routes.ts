import { Application } from 'express';
import { Controller } from '../application/controller';

export const setRoutes = (app: Application): void => {
  const controller = new Controller();

  app.get('/', controller.root.bind(controller));
  app.post(
    '/mortgage-calculation',
    controller.mortgageCalculation.bind(controller)
  );
};
