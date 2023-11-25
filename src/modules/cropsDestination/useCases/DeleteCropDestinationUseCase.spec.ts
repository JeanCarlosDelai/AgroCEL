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
import { ICropRepository } from '@modules/crops/domain/repositories/ICropRepository';
import CreateCropUseCase from '@modules/crops/useCases/CreateCropUseCase';
import DeleteCropDestinationUseCase from './DeleteCropDestinationUseCase';
import { ICropDestinationRepository } from '../domain/repositories/ICropDestinationRepository';
import CreateCropDestinationUseCase from './CreateCropDestinationUseCase';
import { ICrop } from '@modules/crops/domain/models/ICrop';
import { ICropDestination } from '../domain/models/ICropDestination';
import { ICreateCrop } from '@modules/crops/domain/models/ICreateCrop';
import { ICreateCropDestination } from '../domain/models/ICreateCropDestination';
import CropRepositoryInMemory from '@modules/crops/domain/repositories/in-memory/CropRepositoryInMemory';
import CropDestinationRepositoryInMemory from '../domain/repositories/in-memory/CropDestinationRepositoryInMemory';

let usersRepositoryInMemory: IUsersRepository;
let propertysRepositoryInMemory: IPropertyRepository;
let areasRepositoryInMemory: IAreaRepository;
let cropsRepositoryInMemory: ICropRepository;
let cropsDestinationRepositoryInMemory: ICropDestinationRepository;
let fakehashedProvider: IHashProvider;
let createUserUseCase: CreateUserUseCase;
let createPropertyUseCase: CreatePropertyUseCase;
let createAreaUseCase: CreateAreaUseCase;
let createCropUseCase: CreateCropUseCase;
let createCropDestinationUseCase: CreateCropDestinationUseCase;
let deleteCropDestinationUseCase: DeleteCropDestinationUseCase;
let user: IUser;
let property: IProperty;
let area: IArea;
let crop: ICrop;
let cropDestination: ICropDestination;
let id: string;
let crop_id: string;

beforeAll(() => {
  usersRepositoryInMemory = new UsersRepositoryInMemory();
  propertysRepositoryInMemory = new PropertysRepositoryInMemory();
  areasRepositoryInMemory = new AreaRepositoryInMemory();
  cropsRepositoryInMemory = new CropRepositoryInMemory();
  cropsDestinationRepositoryInMemory = new CropDestinationRepositoryInMemory();
  fakehashedProvider = new FakeHashProvider();
  createUserUseCase = new CreateUserUseCase(
    usersRepositoryInMemory,
    fakehashedProvider,
  );
  createPropertyUseCase = new CreatePropertyUseCase(
    propertysRepositoryInMemory,
  );
  createAreaUseCase = new CreateAreaUseCase(areasRepositoryInMemory, propertysRepositoryInMemory);
  createCropUseCase = new CreateCropUseCase(cropsRepositoryInMemory);
  createCropDestinationUseCase = new CreateCropDestinationUseCase(
    cropsDestinationRepositoryInMemory,
  );
  deleteCropDestinationUseCase = new DeleteCropDestinationUseCase(
    cropsDestinationRepositoryInMemory,
  );
});

describe('Delete Crop destination', () => {
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

    const cropDataDestination: ICreateCropDestination = {
      name: 'Coljeita 1',
      area_id: area.id,
      crop_id: crop.id,
      destination: 'Produção própria',
      processing_type: 'Vinho',
      quantity: 10000,
    };
    cropDestination =
      await createCropDestinationUseCase.execute(cropDataDestination);
    id = cropDestination.id;
    crop_id = cropDestination.crop_id;
  });

  it('Should be able to delete a crop destination', async () => {
    const expectErrorResponse = new Error('Crop destination not found.');

    await deleteCropDestinationUseCase.execute({ id, crop_id });

    expect(cropDestination).toHaveProperty('id');

    expect(
      deleteCropDestinationUseCase.execute({ id, crop_id }),
    ).rejects.toThrowError(expectErrorResponse);
  });
});
