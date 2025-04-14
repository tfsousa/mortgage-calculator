import 'tsconfig-paths/register';
import express, { Application, Request, Response } from 'express';
import { setRoutes } from './routes';

const app: Application = express();
const PORT = process.env.PORT || 3001;

setRoutes(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

