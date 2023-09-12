import { DataSource } from 'typeorm';
import { CreateUsers1607534203339 } from './migrations/1607534203339-CreateUsers';
import { CreateUserTokens1607917238905 } from './migrations/1607917238905-CreateUserTokens';
import { CreateProperty1608058533060 } from './migrations/1608058533060-CreateProperty';
import { AddUserIdToProperty1609037132700 } from './migrations/1609037132700-AddUserIdToProperty';
import User from '@modules/user/infra/typeorm/entities/User';
import Property from '@modules/property/infra/typeorm/entities/Property';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'agrocel',
  entities: [User, Property],
  migrations: [
    CreateUsers1607534203339,
    CreateUserTokens1607917238905,
    CreateProperty1608058533060,
    AddUserIdToProperty1609037132700,
  ],
});
