import UsersRepositoryInMemory from '../domain/repositories/in-memory/UsersRepositoryInMemory';
import CreateUserUseCase from './CreateUserUseCase';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashPovider';

let usersRepositoryInMemory: IUsersRepository;
let fakehashedProvider: IHashProvider;
let createUserUseCase: CreateUserUseCase;

beforeAll(() => {
  usersRepositoryInMemory = new UsersRepositoryInMemory();
  fakehashedProvider = new FakeHashProvider();
  createUserUseCase = new CreateUserUseCase(
    usersRepositoryInMemory,
    fakehashedProvider,
  );
});

describe('Create User', () => {
  it('Should be able to create a new user', async () => {
    const userData: ICreateUser = {
      name: 'Jean teste',
      email: 'teste@gmail.com',
      password: await fakehashedProvider.generateHash('jean123'),
    };
    const user = await createUserUseCase.execute(userData);

    expect(user).toHaveProperty('id');
    expect(user.email).toBe(userData.email);
    expect(
      await fakehashedProvider.compareHash(userData.password, user.password),
    ).toBeTruthy();
  });

  it('Should not be able to create an existing user ', async () => {
    const userData: ICreateUser = {
      name: 'Jean teste2',
      email: 'teste2@gmail.com',
      password: await fakehashedProvider.generateHash('jean123'),
    };
    const expectErrorResponse = new Error('Email address already used.');

    await createUserUseCase.execute(userData);

    expect(createUserUseCase.execute(userData)).rejects.toThrowError(
      expectErrorResponse,
    );
  });
});
