import express, { Application } from 'express';
import cors from 'cors';
import { setRoutes } from './routes';

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
