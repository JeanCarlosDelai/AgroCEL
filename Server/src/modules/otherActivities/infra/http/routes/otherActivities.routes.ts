import { Router } from 'express';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import validator from '@shared/infra/http/middlewares/validator';
import { areaIdSchema } from '../schemas/areaIdSchema';
import OtherActivitiesController from '../controllers/OtherActivitiesController';
import { AreaIdOtherActivitiesIdSchema } from '../schemas/areaIdOtherActivitiesIdSchema';
import { updateOtherActivitiesSchema } from '../schemas/updateOtherActivitiesSchema';
import { createOtherActivitiesSchema } from '../schemas/createOtherActivities';
const otherActivitiesRouter = Router();
const otherActivitiesController = new OtherActivitiesController();

otherActivitiesRouter.use(isAuthenticated);

otherActivitiesRouter.get(
  '/:area_id/area/:other_activities_id',
  validator(AreaIdOtherActivitiesIdSchema),
  otherActivitiesController.show,
);

otherActivitiesRouter.get(
  '/:area_id',
  validator(areaIdSchema),
  otherActivitiesController.index,
);

otherActivitiesRouter.post(
  '/:area_id',
  validator(createOtherActivitiesSchema),
  otherActivitiesController.create,
);

otherActivitiesRouter.put(
  '/:area_id/area/:other_activities_id',
  validator(updateOtherActivitiesSchema),
  otherActivitiesController.update,
);

otherActivitiesRouter.delete(
  '/:area_id/area/:other_activities_id',
  validator(AreaIdOtherActivitiesIdSchema),
  otherActivitiesController.delete,
);

export default otherActivitiesRouter;
