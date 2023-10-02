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
import ListPropertyUseCase from './ListPropertyUseCase';

let usersRepositoryInMemory: IUsersRepository;
let propertysRepositoryInMemory: IPropertyRepository;
let fakehashedProvider: IHashProvider;
let createUserUseCase: CreateUserUseCase;
let createPropertyUseCase: CreatePropertyUseCase;
let listPropertyUseCase: ListPropertyUseCase;
let user: IUser;
let property1: IProperty;
let property2: IProperty;

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
  listPropertyUseCase = new ListPropertyUseCase(propertysRepositoryInMemory);
});

describe('Show Property', () => {
  beforeAll(async () => {
    const userData: ICreateUser = {
      name: 'Jean teste',
      email: 'teste@gmail.com',
      password: await fakehashedProvider.generateHash('jean123'),
    };
    user = await createUserUseCase.execute(userData);

    const propertyData1: ICreateProperty = {
      name: 'Propriedade 1',
      user_id: user.id,
      total_area: 10,
      cultivated_area: 5,
      city: 'Coronel Pilar',
      state: 'RS',
    };

    const propertyData2: ICreateProperty = {
      name: 'Propriedade 2',
      user_id: user.id,
      total_area: 10,
      cultivated_area: 5,
      city: 'Coronel Pilar',
      state: 'RS',
    };

    property1 = await createPropertyUseCase.execute(propertyData1);
    property2 = await createPropertyUseCase.execute(propertyData2);
  });

  it('Should be able to list propertys', async () => {
    const response = await listPropertyUseCase.execute(user.id);

    expect(response).toBeTruthy();
    expect(response.data[0].name).toBe(property1.name);
    expect(response.data[1].name).toBe(property2.name);
  });

  // it('Should not be able to show one property', async () => {
  //   const fakeUserId = '1232131321';
  //   const fakePropertyId = '1232131321';
  //   const expectErrorResponse = new Error('Property not exist.');

  //   expect(
  //     listPropertyUseCase.execute(fakeUserId, fakePropertyId),
  //   ).rejects.toThrowError(expectErrorResponse);
  // });
});
