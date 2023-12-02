import UsersRepositoryInMemory from '../domain/repositories/in-memory/UsersRepositoryInMemory';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashPovider';
import CreateUserUseCase from './CreateUserUseCase';
import UpdateProfileUseCase from './UpdateProfileUseCase';
import { IUpdateProfile } from '../domain/models/IUpdateProfile';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';

let usersRepositoryInMemory: IUsersRepository;
let updateProfileUseCase: UpdateProfileUseCase;
let bcryptHashProvider: IHashProvider;
let createUserUseCase: CreateUserUseCase;

beforeAll(() => {
  usersRepositoryInMemory = new UsersRepositoryInMemory();
  updateProfileUseCase = new UpdateProfileUseCase(usersRepositoryInMemory);
  bcryptHashProvider = new BcryptHashProvider();
  createUserUseCase = new CreateUserUseCase(
    usersRepositoryInMemory,
    bcryptHashProvider,
  );
});

describe('Show profile', () => {
  it('Should be able to update the profile', async () => {
    const userData: ICreateUser = {
      name: 'Jean teste3',
      email: 'teste@gmail.com',
      password: 'jean123',
    };

    const { id } = await createUserUseCase.execute(userData);

    const userDataUpdate: IUpdateProfile = {
      user_id: id,
      name: 'Jean teste2',
      email: 'teste@gmail.com',
      password: await bcryptHashProvider.generateHash('jean123456'),
      old_password: 'jean123',
    };

    expect(updateProfileUseCase.execute(userDataUpdate)).toBeTruthy();
  });

  it('Should not be able to update the logged user with invalid user', async () => {
    const userDataUpdate: IUpdateProfile = {
      user_id: '69ec70a8-60d5-4ca6-8bac-0bf80e2a427b',
      name: 'Jean teste2',
      email: 'teste@gmail.com',
      password: await bcryptHashProvider.generateHash('jean123456'),
      old_password: 'jean123',
    };
    const expectErrorResponse = new Error('User not found.');

    expect(updateProfileUseCase.execute(userDataUpdate)).rejects.toThrowError(
      expectErrorResponse,
    );
  });

  it('Should not be able to update the with wrong old password', async () => {
    const userData: ICreateUser = {
      name: 'Jean teste3',
      email: 'teste2@gmail.com',
      password: 'jean123',
    };

    const { id } = await createUserUseCase.execute(userData);

    const userDataUpdate: IUpdateProfile = {
      user_id: id,
      name: 'Jean teste2',
      email: 'teste2@gmail.com',
      password: await bcryptHashProvider.generateHash('jean123456'),
      old_password: 'jean1234',
    };

    const expectErrorResponse = new Error('Old password does not match.');

    expect(updateProfileUseCase.execute(userDataUpdate)).rejects.toThrowError(
      expectErrorResponse,
    );
  });

  it('Should not be able to update without the old password', async () => {
    const userData: ICreateUser = {
      name: 'Jean teste3',
      email: 'teste3@gmail.com',
      password: 'jean123',
    };

    const { id } = await createUserUseCase.execute(userData);

    const userDataUpdate: IUpdateProfile = {
      user_id: id,
      name: 'Jean teste2',
      email: 'teste3@gmail.com',
      password: await bcryptHashProvider.generateHash('jean123456'),
    };

    const expectErrorResponse = new Error('Old password is required.');

    expect(updateProfileUseCase.execute(userDataUpdate)).rejects.toThrowError(
      expectErrorResponse,
    );
  });

  it('Should not be able to update the email for an already registered one', async () => {
    const userData: ICreateUser = {
      name: 'Jean teste3',
      email: 'teste4@gmail.com',
      password: 'jean123',
    };

    const { id } = await createUserUseCase.execute(userData);

    const userDataUpdate: IUpdateProfile = {
      user_id: id,
      name: 'Jean teste2',
      email: 'teste2@gmail.com',
      password: await bcryptHashProvider.generateHash('jean123456'),
      old_password: 'jean123',
    };

    const expectErrorResponse = new Error(
      'There is already one user with this email.',
    );

    expect(updateProfileUseCase.execute(userDataUpdate)).rejects.toThrowError(
      expectErrorResponse,
    );
  });
});
