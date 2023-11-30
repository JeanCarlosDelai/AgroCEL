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
import { ICreateCrop } from '../domain/models/ICreateCrop';
import CropRepositoryInMemory from '../domain/repositories/in-memory/CropRepositoryInMemory';
import CreateCropUseCase from './CreateCropUseCase';
import { ICropRepository } from '../domain/repositories/ICropRepository';
import { ICrop } from '../domain/models/ICrop';
import ShowCropUseCase from './ShowCropUseCase';

let usersRepositoryInMemory: IUsersRepository;
let propertysRepositoryInMemory: IPropertyRepository;
let areasRepositoryInMemory: IAreaRepository;
let cropsRepositoryInMemory: ICropRepository;
let fakehashedProvider: IHashProvider;
let createUserUseCase: CreateUserUseCase;
let createPropertyUseCase: CreatePropertyUseCase;
let createAreaUseCase: CreateAreaUseCase;
let createCropUseCase: CreateCropUseCase;
let showCropUseCase: ShowCropUseCase;
let user: IUser;
let property: IProperty;
let area: IArea;
let crop: ICrop;
let id: string;
let area_id: string;

beforeAll(() => {
  usersRepositoryInMemory = new UsersRepositoryInMemory();
  propertysRepositoryInMemory = new PropertysRepositoryInMemory();
  areasRepositoryInMemory = new AreaRepositoryInMemory();
  cropsRepositoryInMemory = new CropRepositoryInMemory();
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
  createCropUseCase = new CreateCropUseCase(cropsRepositoryInMemory);
  showCropUseCase = new ShowCropUseCase(cropsRepositoryInMemory);
});

describe('Show Crops', () => {
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

    const cropData: ICreateCrop = {
      name: 'Coljeita 1',
      area_id: area.id,
      quantity: 10000,
      crop_date: new Date(),
      crop_time: 10,
    };

    crop = await createCropUseCase.execute(cropData);
    id = crop.id;
    area_id = crop.area_id;
  });

  it('Should be able to show crop', async () => {
    const response = await showCropUseCase.execute({ id, area_id });

    expect(response).toBeTruthy();
    expect(response).toHaveProperty('name');
  });

  it('Should not be able to show one area', async () => {
    const id = '1232131321';
    const area_id = '1232131321';
    const expectErrorResponse = new Error('Area or Crop not exist.');

    expect(showCropUseCase.execute({ id, area_id })).rejects.toThrowError(
      expectErrorResponse,
    );
  });
});
