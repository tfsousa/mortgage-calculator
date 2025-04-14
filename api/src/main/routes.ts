import { Application } from 'express';
import { Controller } from '../application/controllers';

export const setRoutes = (app: Application): void => {
    const controller = new Controller();

    app.get('/', controller.root.bind(controller));
    app.get('/mortgage-calculation', controller.mortgageCalculation.bind(controller));
};