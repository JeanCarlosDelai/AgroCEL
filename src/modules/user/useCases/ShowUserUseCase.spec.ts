import UsersRepositoryInMemory from '../domain/repositories/in-memory/UsersRepositoryInMemory';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashPovider';
import CreateUserUseCase from './CreateUserUseCase';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ShowUserUseCase from './ShowUserUseCase';

let usersRepositoryInMemory: IUsersRepository;
let showUserUseCase: ShowUserUseCase;
let fakehashedProvider: IHashProvider;
let createUserUseCase: CreateUserUseCase;

beforeAll(() => {
  usersRepositoryInMemory = new UsersRepositoryInMemory();
  showUserUseCase = new ShowUserUseCase(usersRepositoryInMemory);
  fakehashedProvider = new FakeHashProvider();
  createUserUseCase = new CreateUserUseCase(
    usersRepositoryInMemory,
    fakehashedProvider,
  );
});

describe('Show profile', () => {
  it('Should be able to show the logged user', async () => {
    const userData: ICreateUser = {
      name: 'Jean teste3',
      email: 'teste@gmail.com',
      password: 'jean123',
    };

    const { id } = await createUserUseCase.execute(userData);
    const user_id = id;
    const response = await showUserUseCase.execute({ user_id });

    expect(response).toBeTruthy();
    expect(response.email).toBe(userData.email);
  });

  it('Should not be able to show the logged user with invalid user', async () => {
    const user_id = '69ec70a8-60d5-4ca6-8bac-0bf80e2a427b';
    const expectErrorResponse = new Error('User not found.');

    expect(showUserUseCase.execute({ user_id })).rejects.toThrowError(
      expectErrorResponse,
    );
  });
});
