import { ICreateUser } from '@modules/user/domain/models/ICreateUser';
import { IUser } from '@modules/user/domain/models/IUser';
import { IUsersRepository } from '@modules/user/domain/repositories/IUsersRepository';
import UsersRepositoryInMemory from '@modules/user/domain/repositories/in-memory/UsersRepositoryInMemory';
import FakeHashProvider from '@modules/user/providers/HashProvider/fakes/FakeHashProvider';
import { IHashProvider } from '@modules/user/providers/HashProvider/models/IHashPovider';
import CreateUserUseCase from '@modules/user/useCases/CreateUserUseCase';
import PropertysRepositoryInMemory from '@modules/property/domain/repositories/in-memory/PropertysRepositoryInMemory';
import CreatePropertyUseCase from '@modules/property/useCases/CreatePropertyUseCase';
import { ICreateProperty } from '@modules/property/domain/models/ICreateProperty';
import { IProperty } from '@modules/property/domain/models/IProperty';
import { IPropertyRepository } from '@modules/property/domain/repositories/IPropertyRepository';
import { IAreaRepository } from '@modules/area/domain/repositories/IAreaRepository';
import CreateAreaUseCase from '@modules/area/useCases/CreateAreaUseCase';
import { IArea } from '@modules/area/domain/models/IArea';
import AreaRepositoryInMemory from '@modules/area/domain/repositories/in-memory/AreaRepositoryInMemory';
import { ICreateArea } from '@modules/area/domain/models/ICreateArea';
import { IOtherActivitiesRepository } from '../domain/repositories/IOtherActivitiesRepository';
import CreateOtherActivitiesUseCase from './CreateOtherActivitiesUseCase';
import ListOtherActivitiesUseCase from './ListOtherActivitiesUseCase';
import { IOtherActivities } from '../domain/models/IOtherActivities';
import OtherActivitiesRepositoryInMemory from '../domain/repositories/in-memory/OtherActivitiesRepositoryInMemory';
import { ICreateOtherActivities } from '../domain/models/ICreateOtherActivities';

let usersRepositoryInMemory: IUsersRepository;
let propertysRepositoryInMemory: IPropertyRepository;
let areasRepositoryInMemory: IAreaRepository;
let otherActivitiesRepositoryInMemory: IOtherActivitiesRepository;
let fakehashedProvider: IHashProvider;
let createUserUseCase: CreateUserUseCase;
let createPropertyUseCase: CreatePropertyUseCase;
let createAreaUseCase: CreateAreaUseCase;
let createOtherActivitiesUseCase: CreateOtherActivitiesUseCase;
let listOtherActivitiesUseCase: ListOtherActivitiesUseCase;
let user: IUser;
let property: IProperty;
let area: IArea;
let otherActivities: IOtherActivities;
let otherActivities2: IOtherActivities;
let area_id: string;

beforeAll(() => {
  usersRepositoryInMemory = new UsersRepositoryInMemory();
  propertysRepositoryInMemory = new PropertysRepositoryInMemory();
  areasRepositoryInMemory = new AreaRepositoryInMemory();
  otherActivitiesRepositoryInMemory = new OtherActivitiesRepositoryInMemory();
  fakehashedProvider = new FakeHashProvider();
  createUserUseCase = new CreateUserUseCase(
    usersRepositoryInMemory,
    fakehashedProvider,
  );
  createPropertyUseCase = new CreatePropertyUseCase(
    propertysRepositoryInMemory,
  );
  createAreaUseCase = new CreateAreaUseCase(
    areasRepositoryInMemory,
    propertysRepositoryInMemory,
  );
  createOtherActivitiesUseCase = new CreateOtherActivitiesUseCase(
    otherActivitiesRepositoryInMemory,
  );
  listOtherActivitiesUseCase = new ListOtherActivitiesUseCase(
    otherActivitiesRepositoryInMemory,
    areasRepositoryInMemory,
  );
});

describe('List Other Activities', () => {
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

    const areaData: ICreateArea = {
      name: 'Pareiral Jackes3',
      property_id: property.id,
      species: 'Uva',
      variety: 'Jackes',
      driving_system: 'Latada',
      rookstock_type: 'Pé Franco',
      cultivated_area: 5,
      geographic_coordinates: '123.3456.6565',
      implementation_date: new Date(),
      number_rows: 50,
      distance_between_rows: 2,
      distance_between_plants: 1,
      number_plants: 2000,
    };
    area = await createAreaUseCase.execute(areaData);

    const otherActivitiesData: ICreateOtherActivities = {
      name: 'Poda da Concord',
      area_id: area.id,
      activitie_category: 'Poda',
      activitie_date: new Date(),
      activitie_time: 10,
      description: 'Foi podado 5 fileiras',
    };

    otherActivities =
      await createOtherActivitiesUseCase.execute(otherActivitiesData);
    area_id = otherActivities.area_id;

    const otherActivitiesData2: ICreateOtherActivities = {
      name: 'Poda da Concord2',
      area_id: area.id,
      activitie_category: 'Poda',
      activitie_date: new Date(),
      activitie_time: 10,
      description: 'Foi podado 6 fileiras',
    };

    otherActivities2 =
      await createOtherActivitiesUseCase.execute(otherActivitiesData2);
  });

  it('Should be able to list other activities', async () => {
    const response = await listOtherActivitiesUseCase.execute(area_id);

    expect(response).toBeTruthy();
    expect(response.data[0].name).toBe(otherActivities.name);
    expect(response.data[1].name).toBe(otherActivities2.name);
  });

  it('Should not be able to list other activities with invalid area', async () => {
    const fakePropertyId = '1232131321';
    const expectErrorResponse = new Error('Area does not exists.');

    expect(
      listOtherActivitiesUseCase.execute(fakePropertyId),
    ).rejects.toThrowError(expectErrorResponse);
  });
});
