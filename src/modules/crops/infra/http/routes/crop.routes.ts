import { Router } from 'express';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import validator from '@shared/infra/http/middlewares/validator';
import CropController from '../controllers/CropController';
import { createCropSchema } from '../schemas/createCrop';
import { AreaIdCropIdSchema } from '../schemas/areaIdCropIdSchema';
import { areaIdSchema } from '../schemas/areaIdSchema';
import { updateCropSchema } from '../schemas/updateCropSchema';
const cropRouter = Router();
const cropController = new CropController();

cropRouter.use(isAuthenticated);

cropRouter.get(
  '/:area_id/area/:crop_id',
  validator(AreaIdCropIdSchema),
  cropController.show,
);

cropRouter.get('/:area_id', validator(areaIdSchema), cropController.index);

cropRouter.post(
  '/:area_id',
  validator(createCropSchema),
  cropController.create,
);

cropRouter.put(
  '/:crop_id/area/:area_id',
  validator(updateCropSchema),
  cropController.update,
);

cropRouter.delete(
  '/:crop_id/area/:area_id',
  validator(AreaIdCropIdSchema),
  cropController.delete,
);

export default cropRouter;
