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
import UpdateOtherActivitiesUseCase from './UpdateOtherActivitiesUseCase';
import OtherActivitiesRepositoryInMemory from '../domain/repositories/in-memory/OtherActivitiesRepositoryInMemory';
import { IOtherActivities } from '../domain/models/IOtherActivities';
import { ICreateOtherActivities } from '../domain/models/ICreateOtherActivities';
import { IUpdateOtherActivities } from '../domain/models/IUpdateOtherActivities';

let usersRepositoryInMemory: IUsersRepository;
let propertysRepositoryInMemory: IPropertyRepository;
let areasRepositoryInMemory: IAreaRepository;
let otherActivitiesRepositoryInMemory: IOtherActivitiesRepository;
let fakehashedProvider: IHashProvider;
let createUserUseCase: CreateUserUseCase;
let createPropertyUseCase: CreatePropertyUseCase;
let createAreaUseCase: CreateAreaUseCase;
let createOtherActivitiesUseCase: CreateOtherActivitiesUseCase;
let updateOtherActivitiesUseCase: UpdateOtherActivitiesUseCase;
let user: IUser;
let property: IProperty;
let area: IArea;
let otherActivities: IOtherActivities;
let id: string;

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
  updateOtherActivitiesUseCase = new UpdateOtherActivitiesUseCase(
    otherActivitiesRepositoryInMemory,
  );
});

describe('Update Crops', () => {
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
      name: 'Poda da Concord2',
      area_id: area.id,
      activitie_category: 'Poda',
      activitie_date: new Date(),
      activitie_time: 10,
      description: 'Foi podado 6 fileiras',
    };

    otherActivities =
      await createOtherActivitiesUseCase.execute(otherActivitiesData);
    id = otherActivities.id;
  });

  it('Should be able to update a crop', async () => {
    const otherActivitiesDataUpdate: IUpdateOtherActivities = {
      id: id,
      name: 'Poda da Concord3',
      area_id: area.id,
      activitie_category: 'Poda',
      activitie_date: new Date(),
      activitie_time: 10,
      description: 'Foi podado 6 fileiras',
    };
    otherActivities = await updateOtherActivitiesUseCase.execute(
      otherActivitiesDataUpdate,
    );

    expect(otherActivities).toBeTruthy();
    expect(otherActivities.name).toBe(otherActivitiesDataUpdate.name);
  });

  it('Should not be able to update a not exist crop', async () => {
    const otherActivitiesDataUpdate: IUpdateOtherActivities = {
      id: id,
      name: 'Poda da Concord3',
      area_id: 'fakeID',
      activitie_category: 'Poda',
      activitie_date: new Date(),
      activitie_time: 10,
      description: 'Foi podado 6 fileiras',
    };
    const expectErrorResponse = new Error('Area or OtherActivities not exist.');

    expect(
      updateOtherActivitiesUseCase.execute(otherActivitiesDataUpdate),
    ).rejects.toThrowError(expectErrorResponse);
  });
});
