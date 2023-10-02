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
import UpdatePropertyUseCase from './updatePropertyUseCase';
import { IUpdateProperty } from '../domain/models/IUpdateProperty';

let usersRepositoryInMemory: IUsersRepository;
let propertysRepositoryInMemory: IPropertyRepository;
let fakehashedProvider: IHashProvider;
let createUserUseCase: CreateUserUseCase;
let createPropertyUseCase: CreatePropertyUseCase;
let updatePropertyUseCase: UpdatePropertyUseCase;
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
  updatePropertyUseCase = new UpdatePropertyUseCase(
    propertysRepositoryInMemory,
  );
});

describe('Update Property', () => {
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

  it('Should be able to update a property', async () => {
    const propertyDataUpdate: IUpdateProperty = {
      name: 'Propriedade 2',
      user_id: user.id,
      property_id: id,
      total_area: 10,
      cultivated_area: 5,
      city: 'Coronel Pilar',
      state: 'RS',
    };
    property = await updatePropertyUseCase.execute(propertyDataUpdate);

    expect(property).toBeTruthy();
    expect(property.name).toBe(propertyDataUpdate.name);
  });

  it('Should not be able to update a not exist property', async () => {
    const propertyDataUpdate: IUpdateProperty = {
      name: 'Propriedade 2',
      user_id: user.id,
      property_id: '11231',
      total_area: 10,
      cultivated_area: 5,
      city: 'Coronel Pilar',
      state: 'RS',
    };
    const expectErrorResponse = new Error('Property not exist.');

    expect(
      updatePropertyUseCase.execute(propertyDataUpdate),
    ).rejects.toThrowError(expectErrorResponse);
  });
});
