import { Router } from 'express';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import validator from '@shared/infra/http/middlewares/validator';
import CropDestinationController from '../controllers/CropDestinationController';
import { CropIdCropDestinationIdSchema } from '../schemas/CropIdCropDestinationIdSchema';
import { CropIdSchema } from '../schemas/CropIdSchema';
import { createCropDestinationSchema } from '../schemas/CreateCropDestination';
import { UpdateCropDestinationSchema } from '../schemas/UpdateCropDestinationSchema';
const cropDestinationRouter = Router();
const cropDestinationController = new CropDestinationController();

cropDestinationRouter.use(isAuthenticated);

cropDestinationRouter.get(
  '/:crop_id/crop/:crop_destination_id',
  validator(CropIdCropDestinationIdSchema),
  cropDestinationController.show,
);

cropDestinationRouter.get(
  '/:area_id',
  validator(CropIdSchema),
  cropDestinationController.index,
);

cropDestinationRouter.post(
  '/:area_id/crop/:crop_id',
  validator(createCropDestinationSchema),
  cropDestinationController.create,
);

cropDestinationRouter.put(
  '/:area_id/area/:crop_id/crop/:crop_destination_id',
  validator(UpdateCropDestinationSchema),
  cropDestinationController.update,
);

cropDestinationRouter.delete(
  '/:crop_id/crop/:crop_destination_id',
  validator(CropIdCropDestinationIdSchema),
  cropDestinationController.delete,
);

export default cropDestinationRouter;
