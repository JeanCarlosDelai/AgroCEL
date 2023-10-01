import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IListUser } from '../domain/models/IListUser';

@injectable()
class ListUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute(): Promise<IListUser> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}

export default ListUserUseCase;
