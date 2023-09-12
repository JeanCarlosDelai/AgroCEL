import { container } from 'tsyringe';

import '@modules/user/providers';
import { IUsersRepository } from '@modules/user/domain/repositories/IUsersRepository';
import UsersRepository from '@modules/user/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/user/infra/typeorm/repositories/UserTokensRepository';
import { IUserTokensRepository } from '@modules/user/domain/repositories/IUserTokensRepository';
import { IPropertyRepository } from '@modules/property/domain/repositories/IPropertyRepository';
import PropertyRepository from '@modules/property/infra/typeorm/repositories/PropertyRepository';


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

