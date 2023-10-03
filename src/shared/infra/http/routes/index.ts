import usersRouter from '@modules/user/infra/http/routes/users.routes';
import sessionsRouter from '@modules/user/infra/http/routes/sessions.routes';
import profileRouter from '@modules/user/infra/http/routes/profile.routes';

import { Router } from 'express';
import propertyRouter from '@modules/property/infra/http/routes/property.routes';
import areaRouter from '@modules/area/infra/http/routes/area.routes';
import cropRouter from '@modules/crops/infra/http/routes/crop.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/property', propertyRouter);
routes.use('/area', areaRouter);
routes.use('/crop', cropRouter);

export default routes;
