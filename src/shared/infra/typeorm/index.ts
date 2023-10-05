import { DataSource } from 'typeorm';
import { CreateUsers1607534203339 } from './migrations/1607534203339-CreateUsers';
import { CreateUserTokens1607917238905 } from './migrations/1607917238905-CreateUserTokens';
import { CreateProperty1608058533060 } from './migrations/1608058533060-CreateProperty';
import { AddUserIdToProperty1609037132700 } from './migrations/1609037132700-AddUserIdToProperty';
import User from '@modules/user/infra/typeorm/entities/User';
import Property from '@modules/property/infra/typeorm/entities/Property';
import { CreateArea1693744290769 } from './migrations/1693744290769-CreateArea';
import Area from '@modules/area/infra/typeorm/entities/Area';
import { CreateCrops1693744290771 } from './migrations/1693744290771-CreateCrops';
import Crop from '@modules/crops/infra/typeorm/entities/Crop';
import { CreateCropsDestination1693744290772 } from './migrations/1693744290772-CreateCropsDestination';
import CropDestination from '@modules/cropsDestination/infra/typeorm/entities/CropDestination';
import { CreateAgriculturInputs1693744290773 } from './migrations/1693744290773-CreateAgriculturalInputs';
import { CreateApplication1693744290774 } from './migrations/1693744290774-CreateApplication';
import Application from '@modules/application/infra/typeorm/entities/Application';
import AgriculturalInputs from '@modules/agriculturalInputs/infra/typeorm/entities/AgriculturalInputs';
import { CreateOtherActivities1693744290775 } from './migrations/1693744290775-CreateOtherActivities';
import OtherActivities from '@modules/otherActivities/infra/typeorm/entities/OtherActivities';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'agrocel',
  entities: [
    User,
    Property,
    Area,
    Crop,
    CropDestination,
    Application,
    AgriculturalInputs,
    OtherActivities,
  ],
  migrations: [
    CreateUsers1607534203339,
    CreateUserTokens1607917238905,
    CreateProperty1608058533060,
    AddUserIdToProperty1609037132700,
    CreateArea1693744290769,
    CreateCrops1693744290771,
    CreateCropsDestination1693744290772,
    CreateAgriculturInputs1693744290773,
    CreateApplication1693744290774,
    CreateOtherActivities1693744290775,
  ],
});
