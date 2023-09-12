import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import validator from '@shared/infra/http/middlewares/validator';
import { sessionTokenSchema } from '../Schemas/sessionToken';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  validator(sessionTokenSchema),
  sessionsController.create,
);

export default sessionsRouter;
