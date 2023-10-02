import { ICreateUser } from '@modules/user/domain/models/ICreateUser';
import { IUser } from '@modules/user/domain/models/IUser';
import { IUsersRepository } from '@modules/user/domain/repositories/IUsersRepository';
import UsersRepositoryInMemory from '@modules/user/domain/repositories/in-memory/UsersRepositoryInMemory';
import FakeHashProvider from '@modules/user/providers/HashProvider/fakes/FakeHashProvider';
import { IHashProvider } from '@modules/user/providers/HashProvider/models/IHashPovider';
import CreateUserUseCase from '@modules/user/useCases/CreateUserUseCase';
import CreatePropertyUseCase from './CreatePropertyUseCase';
import PropertysRepositoryInMemory from '../domain/repositories/in-memory/PropertysRepositoryInMemory';
import { IPropertyRepository } from '../domain/repositories/IPropertyRepository';
import { ICreateProperty } from '../domain/models/ICreateProperty';
import { IProperty } from '../domain/models/IProperty';
import DeletePropertyUseCase from './DeletePropertyUseCase';

let usersRepositoryInMemory: IUsersRepository;
let propertysRepositoryInMemory: IPropertyRepository;
let fakehashedProvider: IHashProvider;
let createUserUseCase: CreateUserUseCase;
let createPropertyUseCase: CreatePropertyUseCase;
let deletePropertyUseCase: DeletePropertyUseCase;
let user: IUser;
let property: IProperty;
let id: string;

beforeAll(() => {
  usersRepositoryInMemory = new UsersRepositoryInMemory();
  propertysRepositoryInMemory = new PropertysRepositoryInMemory();
  fakehashedProvider = new FakeHashProvider();
  createUserUseCase = new CreateUserUseCase(
    usersRepositoryInMemory,
    fakehashedProvider,
  );
  createPropertyUseCase = new CreatePropertyUseCase(
    propertysRepositoryInMemory,
  );
  deletePropertyUseCase = new DeletePropertyUseCase(
    propertysRepositoryInMemory,
  );
});

describe('Delete Property', () => {
  beforeAll(async () => {
    const userData: ICreateUser = {
      name: 'Jean teste',
      email: 'teste@gmail.com',
      password: await fakehashedProvider.generateHash('jean123'),
    };
    user = await createUserUseCase.execute(userData);

    const propertyData: ICreateProperty = {
      name: 'Propriedade 1',
      user_id: user.id,
      total_area: 10,
      cultivated_area: 5,
      city: 'Coronel Pilar',
      state: 'RS',
    };
    property = await createPropertyUseCase.execute(propertyData);
    id = property.id;
  });

  it('Should be able to delete a property', async () => {
    const expectErrorResponse = new Error('Property not found.');

    await deletePropertyUseCase.execute({ id });

    expect(deletePropertyUseCase.execute({ id })).rejects.toThrowError(
      expectErrorResponse,
    );
  });
});
