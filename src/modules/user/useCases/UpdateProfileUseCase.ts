import { inject, injectable } from 'tsyringe';
import CustomAPIError from '@shared/errors';
import { compare, hash } from 'bcryptjs';
import authConfig from '@config/auth';
import { IUpdateProfile } from '../domain/models/IUpdateProfile';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { sign, Secret } from 'jsonwebtoken';
import { IProfileUpdate } from '../domain/models/IProfileUpdate';

@injectable()
class UpdateProfileUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository, // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line prettier/prettier
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IUpdateProfile): Promise<IProfileUpdate> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new CustomAPIError.BadRequestError('User not found.');
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new CustomAPIError.BadRequestError(
        'There is already one user with this email.',
      );
    }

    if (password && !old_password) {
      throw new CustomAPIError.BadRequestError('Old password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new CustomAPIError.BadRequestError(
          'Old password does not match.',
        );
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await this.usersRepository.save(user);

    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default UpdateProfileUseCase;
