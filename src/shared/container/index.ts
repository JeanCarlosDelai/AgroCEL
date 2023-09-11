import { container } from 'tsyringe';

import '@modules/users/providers';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';


container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);


