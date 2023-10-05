import { container } from 'tsyringe';

import '@modules/user/providers';
import { IUsersRepository } from '@modules/user/domain/repositories/IUsersRepository';
import UsersRepository from '@modules/user/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/user/infra/typeorm/repositories/UserTokensRepository';
import { IUserTokensRepository } from '@modules/user/domain/repositories/IUserTokensRepository';
import { IPropertyRepository } from '@modules/property/domain/repositories/IPropertyRepository';
import PropertyRepository from '@modules/property/infra/typeorm/repositories/PropertyRepository';
import { IAreaRepository } from '@modules/area/domain/repositories/IAreaRepository';
import AreaRepository from '@modules/area/infra/typeorm/repositories/AreaRepository';
import { ICropRepository } from '@modules/crops/domain/repositories/ICropRepository';
import CropRepository from '@modules/crops/infra/typeorm/repositories/CropRepository';
import { ICropDestinationRepository } from '@modules/cropsDestination/domain/repositories/ICropDestinationRepository';
import CropDestinationRepository from '@modules/cropsDestination/infra/typeorm/repositories/CropDestinationRepository';
import { IApplicationRepository } from '@modules/application/domain/repositories/IApplicationRepository';
import ApplicationRepository from '@modules/application/infra/typeorm/repositories/ApplicationRepository';
import { IAgriculturalInputsRepository } from '@modules/agriculturalInputs/domain/repositories/IAgriculturalInputsRepository';
import AgriculturalInputsRepository from '@modules/agriculturalInputs/infra/typeorm/repositories/AgriculturalInputsRepository';
import { IOtherActivitiesRepository } from '@modules/otherActivities/domain/repositories/IOtherActivitiesRepository';
import OtherActivitiesRepository from '@modules/otherActivities/infra/typeorm/repositories/OtherActivitiesRepository';
import { ICropSaleRepository } from '@modules/cropsSale/domain/repositories/ICropSaleRepository';
import CropSaleRepository from '@modules/cropsSale/typeorm/repositories/CropSaleRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IPropertyRepository>(
  'PropertyRepository',
  PropertyRepository,
);

container.registerSingleton<IAreaRepository>('AreaRepository', AreaRepository);

container.registerSingleton<ICropRepository>('CropRepository', CropRepository);

container.registerSingleton<ICropDestinationRepository>(
  'CropDestinationRepository',
  CropDestinationRepository,
);

container.registerSingleton<IApplicationRepository>(
  'ApplicationRepository',
  ApplicationRepository,
);

container.registerSingleton<IAgriculturalInputsRepository>(
  'AgriculturalInputsRepository',
  AgriculturalInputsRepository,
);

container.registerSingleton<IOtherActivitiesRepository>(
  'OtherActivitiesRepository',
  OtherActivitiesRepository,
);

container.registerSingleton<ICropSaleRepository>(
  'CropSaleRepository',
  CropSaleRepository,
);
