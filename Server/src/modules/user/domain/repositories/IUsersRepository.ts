import { ICreateUser } from '../models/ICreateUser';
import { IListUser } from '../models/IListUser';
import { IUser } from '../models/IUser';

export interface IUsersRepository {
  findAll(): Promise<IListUser>;
  findByName(name: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  create(data: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
}
