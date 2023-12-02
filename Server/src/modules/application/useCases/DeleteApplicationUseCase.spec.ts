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
import DeleteApplicationUseCase from './DeleteApplicationUseCase';
import { IApplicationRepository } from '../domain/repositories/IApplicationRepository';
import CreateApplicationUseCase from './CreateApplicationUseCase';
import { IApplication } from '../domain/models/IApplication';
import ApplicationRepositoryInMemory from '../domain/repositories/in-memory/ApplicationRepositoryInMemory';
import { ICreateApplication } from '../domain/models/ICreateApplication';

let usersRepositoryInMemory: IUsersRepository;
let propertysRepositoryInMemory: IPropertyRepository;
let areasRepositoryInMemory: IAreaRepository;
let applicationRepositoryInMemory: IApplicationRepository;
let fakehashedProvider: IHashProvider;
let createUserUseCase: CreateUserUseCase;
let createPropertyUseCase: CreatePropertyUseCase;
let createAreaUseCase: CreateAreaUseCase;
let createApplicationUseCase: CreateApplicationUseCase;
let deleteApplicationUseCase: DeleteApplicationUseCase;
let user: IUser;
let property: IProperty;
let area: IArea;
let application: IApplication;
let id: string;
let area_id: string;

beforeAll(() => {
  usersRepositoryInMemory = new UsersRepositoryInMemory();
  propertysRepositoryInMemory = new PropertysRepositoryInMemory();
  areasRepositoryInMemory = new AreaRepositoryInMemory();
  applicationRepositoryInMemory = new ApplicationRepositoryInMemory();
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
  createApplicationUseCase = new CreateApplicationUseCase(
    applicationRepositoryInMemory,
  );
  deleteApplicationUseCase = new DeleteApplicationUseCase(
    applicationRepositoryInMemory,
  );
});

describe('Delete Application', () => {
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

    const applicationData: ICreateApplication = {
      area_id: area.id,
      used_product: area.id,
      quantity: 10000,
      application_type: 'Pulverização',
      application_date: new Date(),
      application_time: 10,
      description: 'Foi gastado 5 bombas de 300L de água + produto',
    };
    application = await createApplicationUseCase.execute(applicationData);
    id = application.id;
    area_id = application.area_id;
  });

  it('Should be able to delete a crop', async () => {
    const expectErrorResponse = new Error('Application not found.');

    await deleteApplicationUseCase.execute({ id, area_id });

    expect(application).toHaveProperty('id');
    expect(
      deleteApplicationUseCase.execute({ id, area_id }),
    ).rejects.toThrowError(expectErrorResponse);
  });
});
