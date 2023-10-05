import usersRouter from '@modules/user/infra/http/routes/users.routes';
import sessionsRouter from '@modules/user/infra/http/routes/sessions.routes';
import profileRouter from '@modules/user/infra/http/routes/profile.routes';

import { Router } from 'express';
import propertyRouter from '@modules/property/infra/http/routes/property.routes';
import areaRouter from '@modules/area/infra/http/routes/area.routes';
import cropRouter from '@modules/crops/infra/http/routes/crop.routes';
import cropDestinationRouter from '@modules/cropsDestination/infra/http/routes/cropDestination.routes';
import applicationRouter from '@modules/application/infra/http/routes/application.routes';
import agriculturalIputsRouter from '@modules/agriculturalInputs/infra/http/routes/AgriculturalInputs';
import otherActivitiesRouter from '@modules/otherActivities/infra/http/routes/otherActivities.routes';
import cropSaleRouter from '@modules/cropsSale/infra/http/routes/cropSale.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/property', propertyRouter);
routes.use('/area', areaRouter);
routes.use('/crop', cropRouter);
routes.use('/crop/destination', cropDestinationRouter);
routes.use('/crop/sale', cropSaleRouter);
routes.use('/application', applicationRouter);
routes.use('/inputs', agriculturalIputsRouter);
routes.use('/other', otherActivitiesRouter);

export default routes;
