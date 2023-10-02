import { Repository } from 'typeorm';
import Property from '../entities/Property';
import { dataSource } from '@shared/infra/typeorm';
import { IPropertyRepository } from '@modules/property/domain/repositories/IPropertyRepository';
import { ICreateProperty } from '@modules/property/domain/models/ICreateProperty';
import { IPropertyAllOfUser } from '@modules/property/domain/models/IPropertyAllOfUser';
import { IProperty } from '@modules/property/domain/models/IProperty';

class PropertyRepository implements IPropertyRepository {
  private ormRepository: Repository<Property>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Property);
  }
  public async create({
    name,
    user_id,
    total_area,
    cultivated_area,
    city,
    state,
  }: ICreateProperty): Promise<Property> {
    const property = this.ormRepository.create({
      name,
      user_id,
      total_area,
      cultivated_area,
      city,
      state,
    });

    await this.ormRepository.save(property);

    return property;
  }

  public async save(property: IProperty): Promise<IProperty> {
    await this.ormRepository.save(property);

    return property;
  }

  public async remove(property: Property): Promise<void> {
    await this.ormRepository.remove(property);
  }

  public async findAllOfUser(user_Id: string): Promise<IPropertyAllOfUser> {
    const properties = await this.ormRepository
      .createQueryBuilder('propertys')
      .where('propertys.user_id = :user_Id', { user_Id })
      .getMany();

    const result = {
      data: properties,
    };

    return result;
  }

  public async findByName(
    name: string,
    user_id: string,
  ): Promise<IProperty | null> {
    const property = await this.ormRepository.findOne({
      where: {
        name,
        user_id,
      },
    });

    return property;
  }

  public async findByIds(
    user_id: string,
    id: string,
  ): Promise<IProperty | null> {
    const property = await this.ormRepository.findOne({
      where: {
        user_id,
        id,
      },
    });

    return property;
  }
  public async findById(id: string): Promise<IProperty | null> {
    const property = await this.ormRepository.findOneBy({
      id,
    });

    return property;
  }
}

export default PropertyRepository;
