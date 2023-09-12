import { Router } from 'express';
import multer from 'multer';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import validator from '@shared/infra/http/middlewares/validator';
import { paramsIdSchema } from '../Schemas/paramsId';
import { createUserSchema } from '../Schemas/createUser';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.get(
  '/:id',
  isAuthenticated,
  validator(paramsIdSchema),
  usersController.show,
);
usersRouter.post('/', validator(createUserSchema), usersController.create);

export default usersRouter;
