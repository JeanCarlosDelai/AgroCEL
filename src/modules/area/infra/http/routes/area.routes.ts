import { Router } from 'express';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import AreaController from '../controllers/AreaController';
import validator from '@shared/infra/http/middlewares/validator';
import { createAreaSchema } from '../schemas/createArea';
import { propertyIdSchema } from '../schemas/propertyIdSchema';
import { propertyIdAreaIdSchema } from '../schemas/propertyIdAreaIdSchema';
import { updateAreaSchema } from '../schemas/updateAreaSchema';
const areaRouter = Router();
const areaController = new AreaController();

areaRouter.use(isAuthenticated);

areaRouter.get(
  '/:property_id/property/:area_id',
  validator(propertyIdAreaIdSchema),
  areaController.show,
);

areaRouter.get(
  '/:property_id',
  validator(propertyIdSchema),
  areaController.index,
);

areaRouter.post(
  '/:property_id',
  validator(createAreaSchema),
  areaController.create,
);

areaRouter.put(
  '/:property_id/put/:area_id',
  validator(updateAreaSchema),
  areaController.update,
);

areaRouter.delete(
  '/:property_id/delete/:area_id',
  validator(propertyIdAreaIdSchema),
  areaController.delete,
);

export default areaRouter;
