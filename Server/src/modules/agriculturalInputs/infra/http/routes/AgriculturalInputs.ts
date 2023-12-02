import { Router } from 'express';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import validator from '@shared/infra/http/middlewares/validator';
import AgriculturalIputsController from '../controllers/AgriculturalInputsController';
import { createAgriculturalInputsSchema } from '../schemas/createAgriculturalInputs';
import { paramsIdSchema } from '@modules/user/infra/http/Schemas/paramsId';
const agriculturalIputsRouter = Router();
const agriculturalIputsController = new AgriculturalIputsController();

agriculturalIputsRouter.use(isAuthenticated);

agriculturalIputsRouter.get(
  '/:id',
  validator(paramsIdSchema),
  agriculturalIputsController.show,
);

agriculturalIputsRouter.get('/', agriculturalIputsController.index);

agriculturalIputsRouter.post(
  '/',
  validator(createAgriculturalInputsSchema),
  agriculturalIputsController.create,
);

export default agriculturalIputsRouter;
