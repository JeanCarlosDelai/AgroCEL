import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';
import { IOtherActivities } from '@modules/otherActivities/domain/models/IOtherActivities';
import OtherActivities from '../entities/OtherActivities';
import { ICreateOtherActivities } from '@modules/otherActivities/domain/models/ICreateOtherActivities';
import { IListOtherActivities } from '@modules/otherActivities/domain/models/IListOtherActivities';
import { IOtherActivitiesRepository } from '@modules/otherActivities/domain/repositories/IOtherActivitiesRepository';

class OtherActivitiesRepository implements IOtherActivitiesRepository {
  private ormRepository: Repository<OtherActivities>;

  constructor() {
    this.ormRepository = dataSource.getRepository(OtherActivities);
  }
  public async create({
    name,
    area_id,
    description,
    activitie_category,
    activitie_date,
    activitie_time,
  }: ICreateOtherActivities): Promise<IOtherActivities> {
    const otherActivities = this.ormRepository.create({
      name,
      area_id,
      description,
      activitie_category,
      activitie_date,
      activitie_time,
    });

    await this.ormRepository.save(otherActivities);

    return otherActivities;
  }

  public async save(
    otherActivities: IOtherActivities,
  ): Promise<IOtherActivities> {
    await this.ormRepository.save(otherActivities);

    return otherActivities;
  }

  public async remove(otherActivities: OtherActivities): Promise<void> {
    await this.ormRepository.remove(otherActivities);
  }

  public async findAll(area_Id: string): Promise<IListOtherActivities> {
    const otherActivities = await this.ormRepository
      .createQueryBuilder('other_activities')
      .where('other_activities.area_id = :area_Id', { area_Id })
      .getMany();

    const result = {
      data: otherActivities,
    };

    return result;
  }

  public async findByName(
    name: string,
    area_id: string,
  ): Promise<IOtherActivities | null> {
    const otherActivities = await this.ormRepository.findOne({
      where: {
        name,
        area_id,
      },
    });

    return otherActivities;
  }

  public async findByIds(
    id: string,
    area_id: string,
  ): Promise<IOtherActivities | null> {
    const otherActivities = await this.ormRepository.findOne({
      where: {
        id,
        area_id,
      },
    });

    return otherActivities;
  }
  public async findById(id: string): Promise<IOtherActivities | null> {
    const otherActivities = await this.ormRepository.findOneBy({
      id,
    });

    return otherActivities;
  }
}

export default OtherActivitiesRepository;
