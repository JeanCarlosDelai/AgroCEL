import UsersRepositoryInMemory from '../domain/repositories/in-memory/UsersRepositoryInMemory';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import ListUserUseCase from './ListUserUseCase';
import { IHashProvider } from '../providers/HashProvider/models/IHashPovider';
import CreateUserUseCase from './CreateUserUseCase';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let usersRepositoryInMemory: IUsersRepository;
let listUserUseCase: ListUserUseCase;
let fakehashedProvider: IHashProvider;
let createUserUseCase: CreateUserUseCase;

beforeAll(() => {
  usersRepositoryInMemory = new UsersRepositoryInMemory();
  listUserUseCase = new ListUserUseCase(usersRepositoryInMemory);
  fakehashedProvider = new FakeHashProvider();
  createUserUseCase = new CreateUserUseCase(
    usersRepositoryInMemory,
    fakehashedProvider,
  );
});

describe('Create User', () => {
  it('Should be able to list users', async () => {
    const userData1: ICreateUser = {
      name: 'Jean teste3',
      email: 'teste@gmail.com',
      password: 'jean123',
    };
    const userData2: ICreateUser = {
      name: 'Jean teste3',
      email: 'teste2@gmail.com',
      password: 'jean123',
    };

    await createUserUseCase.execute(userData1);
    await createUserUseCase.execute(userData2);

    const response = await listUserUseCase.execute();

    expect(response).toBeTruthy();
    expect(response.data[0].email).toBe(userData1.email);
    expect(response.data[1].email).toBe(userData2.email);
  });
});
