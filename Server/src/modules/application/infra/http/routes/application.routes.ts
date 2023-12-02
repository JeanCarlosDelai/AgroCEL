import { Router } from 'express';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import validator from '@shared/infra/http/middlewares/validator';
import { areaIdSchema } from '../schemas/areaIdSchema';
import ApplicationController from '../controllers/ApplicationController';
import { AreaIdApplicationIdSchema } from '../schemas/areaIdApplicationIdSchema';
import { createApplicationSchema } from '../schemas/createApplication';
import { updateApplciationSchema } from '../schemas/updateApplicationSchema';
const applicationRouter = Router();
const applicationController = new ApplicationController();

applicationRouter.use(isAuthenticated);

applicationRouter.get(
  '/:area_id/area/:application_id',
  validator(AreaIdApplicationIdSchema),
  applicationController.show,
);

applicationRouter.get(
  '/:area_id',
  validator(areaIdSchema),
  applicationController.index,
);

applicationRouter.post(
  '/:area_id',
  validator(createApplicationSchema),
  applicationController.create,
);

applicationRouter.put(
  '/:area_id/area/:application_id',
  validator(updateApplciationSchema),
  applicationController.update,
);

applicationRouter.delete(
  '/:area_id/area/:application_id',
  validator(AreaIdApplicationIdSchema),
  applicationController.delete,
);

export default applicationRouter;
