import { Router } from 'express';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import validator from '@shared/infra/http/middlewares/validator';
import { CropIdCropSaleIdSchema } from '../schemas/CropIdCropSaleIdSchema';
import { createCropSaleSchema } from '../schemas/CreateCropSale';
import { UpdateCropSaleSchema } from '../schemas/UpdateCropSaleSchema';
import CropSaleController from '../controllers/CropSaleController';
import { CropIdSchema } from '@modules/cropsDestination/infra/http/schemas/CropIdSchema';
const cropSaleRouter = Router();
const cropSaleController = new CropSaleController();

cropSaleRouter.use(isAuthenticated);

cropSaleRouter.get(
  '/:crop_id/crop/:crop_sale_id',
  validator(CropIdCropSaleIdSchema),
  cropSaleController.show,
);

cropSaleRouter.get(
  '/:crop_id',
  validator(CropIdSchema),
  cropSaleController.index,
);

cropSaleRouter.post(
  '/:area_id/crop/:crop_id',
  validator(createCropSaleSchema),
  cropSaleController.create,
);

cropSaleRouter.put(
  '/:area_id/area/:crop_id/crop/:crop_sale_id',
  validator(UpdateCropSaleSchema),
  cropSaleController.update,
);

cropSaleRouter.delete(
  '/:crop_id/crop/:crop_sale_id',
  validator(CropIdCropSaleIdSchema),
  cropSaleController.delete,
);

export default cropSaleRouter;
