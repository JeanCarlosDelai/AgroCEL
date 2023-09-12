import User from '@modules/users/infra/typeorm/entities/User';
import { DataSource } from 'typeorm';
import { CreateUsers1607534203339 } from './migrations/1607534203339-CreateUsers';
import { CreateUserTokens1607917238905 } from './migrations/1607917238905-CreateUserTokens';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'agrocel',
  entities: [User],
  migrations: [
    CreateUsers1607534203339,
    CreateUserTokens1607917238905,
  ],
});
