import { ICreateUser } from '@modules/user/domain/models/ICreateUser';
import { IListUser } from '@modules/user/domain/models/IListUser';
import { IUsersRepository } from '@modules/user/domain/repositories/IUsersRepository';
import { Repository } from 'typeorm';
import User from '../entities/User';
import { dataSource } from '@shared/infra/typeorm';
import { IUser } from '@modules/user/domain/models/IUser';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    await this.ormRepository.save(user);

    return user;
  }

  public async findAll(): Promise<IListUser> {
    const users = await this.ormRepository
      .createQueryBuilder('users')
      .getMany();

    const result = {
      data: users,
    };

    return result;
  }

  public async findByName(name: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({
      name,
    });

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({
      id,
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepository.findOneBy({
      email,
    });

    return user;
  }
}

export default UsersRepository;
