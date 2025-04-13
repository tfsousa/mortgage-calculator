import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { setRoutes } from './routes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default (app: Application): void => {
    app.get('/', (req: Request, res: Response) => {
        res.send('Success!');
    });
};