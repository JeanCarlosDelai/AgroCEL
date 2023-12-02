import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';
import { IAreaRepository } from '@modules/area/domain/repositories/IAreaRepository';
import Area from '../entities/Area';
import { ICreateArea } from '@modules/area/domain/models/ICreateArea';
import { IArea } from '@modules/area/domain/models/IArea';
import { IListArea } from '@modules/area/domain/models/IListArea';

class AreaRepository implements IAreaRepository {
  private ormRepository: Repository<Area>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Area);
  }
  public async create({
    name,
    property_id,
    species,
    variety,
    driving_system,
    rookstock_type,
    cultivated_area,
    geographic_coordinates,
    implementation_date,
    number_rows,
    distance_between_rows,
    distance_between_plants,
    number_plants,
  }: ICreateArea): Promise<IArea> {
    const area = this.ormRepository.create({
      name,
      property_id,
      species,
      variety,
      driving_system,
      rookstock_type,
      cultivated_area,
      geographic_coordinates,
      implementation_date,
      number_rows,
      distance_between_rows,
      distance_between_plants,
      number_plants,
    });

    await this.ormRepository.save(area);

    return area;
  }

  public async save(area: IArea): Promise<IArea> {
    await this.ormRepository.save(area);

    return area;
  }

  public async remove(area: Area): Promise<void> {
    await this.ormRepository.remove(area);
  }

  public async findAll(property_Id: string): Promise<IListArea> {
    const areas = await this.ormRepository
      .createQueryBuilder('areas')
      .where('areas.property_id = :property_Id', { property_Id })
      .getMany();

    const result = {
      data: areas,
    };

    return result;
  }

  public async findByName(
    name: string,
    property_id: string,
  ): Promise<IArea | null> {
    const area = await this.ormRepository.findOne({
      where: {
        name,
        property_id,
      },
    });

    return area;
  }

  public async findByIds(
    property_id: string,
    id: string,
  ): Promise<IArea | null> {
    const area = await this.ormRepository.findOne({
      where: {
        property_id,
        id,
      },
    });

    return area;
  }
  public async findById(id: string): Promise<IArea | null> {
    const area = await this.ormRepository.findOneBy({
      id,
    });

    return area;
  }
}

export default AreaRepository;
