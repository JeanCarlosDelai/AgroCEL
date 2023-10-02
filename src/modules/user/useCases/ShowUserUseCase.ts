import { inject, injectable } from 'tsyringe';
import CustomAPIError from '@shared/errors';
import User from '../infra/typeorm/entities/User';
import { IShowUser } from '../domain/models/IShowUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class ShowUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute({ user_id }: IShowUser): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new CustomAPIError.BadRequestError('User not found.');
    }

    return user;
  }
}

export default ShowUserUseCase;
