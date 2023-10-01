import { v4 as uuidv4 } from 'uuid';
import { ICreateUser } from '@modules/user/domain/models/ICreateUser';
import { IUsersRepository } from '@modules/user/domain/repositories/IUsersRepository';
import User from '@modules/user/infra/typeorm/entities/User';
import { IListUser } from '../../models/IListUser';

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = new User();

    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async remove(user: User): Promise<void> { }

  public async findAll(): Promise<IListUser> {
    const usersPaginate: IListUser = {
      data: this.users,
    };

    return usersPaginate;
  }


  public async findByName(name: string): Promise<User | null> {
    const user = this.users.find(user => user.name === name);
    if (user) {
      return user;
    } else return null;
  }

  public async findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id);
    if (user) {
      return user;
    } else return null
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);
    if (user) {
      return user;
    } else return null
  }
}

export default UsersRepositoryInMemory;
