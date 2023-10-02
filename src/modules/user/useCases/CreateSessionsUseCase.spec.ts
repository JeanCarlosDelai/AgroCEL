// import CustomAPIError from '@shared/errors';
import UsersRepositoryInMemory from '../domain/repositories/in-memory/UsersRepositoryInMemory';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionsUseCase from './CreateSessionsUseCase';
import CreateUserUseCase from './CreateUserUseCase';

let createSessionsUseCase: CreateSessionsUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let fakeHashProvider: FakeHashProvider;
let createUserUseCase: CreateUserUseCase;

beforeEach(() => {
  usersRepositoryInMemory = new UsersRepositoryInMemory();
  fakeHashProvider = new FakeHashProvider();
  createSessionsUseCase = new CreateSessionsUseCase(
    usersRepositoryInMemory,
    fakeHashProvider,
  );
  createUserUseCase = new CreateUserUseCase(
    usersRepositoryInMemory,
    fakeHashProvider,
  );
});

describe('Create Sessions', () => {
  it('Should be able to create a session', async () => {
    const userData = {
      name: 'Jean',
      email: 'jean@gmail.com',
      password: 'jean123',
    };

    const user = await createUserUseCase.execute(userData);

    const session = await createSessionsUseCase.execute({
      email: userData.email,
      password: userData.password,
    });

    expect(session).toHaveProperty('token');
    expect(session).toHaveProperty('user');
    expect(session.user.id).toEqual(user.id);
  });

  it('Should not be able to create a session with incorrect email', async () => {
    const userData = {
      name: 'Jean',
      email: 'jean@gmail.com',
      password: 'jean123',
    };

    await createUserUseCase.execute(userData);

    const wrongEmail = 'wrong@gmail.com';

    const expectErrorResponse = new Error(
      'Incorrect email/password combination',
    );

    expect(
      createSessionsUseCase.execute({
        email: wrongEmail,
        password: userData.password,
      }),
    ).rejects.toThrowError(expectErrorResponse);
  });

  it('Should not be able to create a session with incorrect password', async () => {
    const userData = {
      name: 'Jean',
      email: 'jean@gmail.com',
      password: 'jean123',
    };

    await createUserUseCase.execute(userData);

    const wrongPassword = 'wrong_password';

    const expectErrorResponse = new Error(
      'Incorrect email/password combination',
    );

    expect(
      createSessionsUseCase.execute({
        email: userData.email,
        password: wrongPassword,
      }),
    ).rejects.toThrowError(expectErrorResponse);
  });
});
