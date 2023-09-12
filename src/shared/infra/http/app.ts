import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import errorHandlerMiddleware from './middlewares/error-handler';
import notFound from './middlewares/not-found';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandlerMiddleware);
app.use(notFound);

export default app;
