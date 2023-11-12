import { Router } from 'express';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import ReportController from '../controllers/ReportController';
// import validator from '@shared/infra/http/middlewares/validator';
// import { propertyIdSchema } from '../schemas/propertyIdSchema';
const reportRouter = Router();
const reportController = new ReportController();

reportRouter.use(isAuthenticated);

// areaRouter.get(
//   '/:property_id/property/:area_id',
//   validator(propertyIdAreaIdSchema),
//   areaController.show,
// );

reportRouter.get(
  '/pdf/:property_id',
  reportController.index,
);

// areaRouter.post(
//   '/:property_id',
//   validator(createAreaSchema),
//   areaController.create,
// );

// areaRouter.put(
//   '/:property_id/put/:area_id',
//   validator(updateAreaSchema),
//   areaController.update,
// );

// areaRouter.delete(
//   '/:property_id/delete/:area_id',
//   validator(propertyIdAreaIdSchema),
//   areaController.delete,
// );

export default reportRouter;
