import { v4 as uuidv4 } from 'uuid';
import { IOtherActivitiesRepository } from '../IOtherActivitiesRepository';
import { IListOtherActivities } from '../../models/IListOtherActivities';
import { ICreateOtherActivities } from '../../models/ICreateOtherActivities';
import OtherActivities from '@modules/otherActivities/infra/typeorm/entities/OtherActivities';

class OtherActivitiesRepositoryInMemory implements IOtherActivitiesRepository {
  private otherActivities: OtherActivities[] = [];

  public async create({
    name,
    area_id,
    description,
    activitie_category,
    activitie_date,
    activitie_time,
  }: ICreateOtherActivities): Promise<OtherActivities> {
    const area = new OtherActivities();

    area.id = uuidv4();
    area.name = name;
    area.area_id = area_id;
    area.description = description;
    area.activitie_category = activitie_category;
    area.activitie_date = activitie_date;
    area.activitie_time = activitie_time;

    this.otherActivities.push(area);

    return area;
  }

  public async save(
    otherActivities: OtherActivities,
  ): Promise<OtherActivities> {
    const findIndex = this.otherActivities.findIndex(
      (findOtherActivities) => findOtherActivities.id === otherActivities.id,
    );

    this.otherActivities[findIndex] = otherActivities;

    return otherActivities;
  }

  public async remove(otherActivities: OtherActivities): Promise<void> {
    const otherActivitiesIndex = this.otherActivities.findIndex(
      (findOtherActivities) => findOtherActivities.id === otherActivities.id,
    );

    this.otherActivities.splice(otherActivitiesIndex, 1);
  }

  public async findAll(area_id: string): Promise<IListOtherActivities> {
    const otherActivities: OtherActivities[] = this.otherActivities.filter(
      (area) => area.area_id === area_id,
    );

    return { data: otherActivities };
  }

  public async findByName(
    name: string,
    area_id: string,
  ): Promise<OtherActivities | null> {
    const otherActivities = this.otherActivities.find(
      (otherActivities) =>
        otherActivities.name === name && otherActivities.area_id === area_id,
    );
    if (otherActivities) {
      return otherActivities;
    } else return null;
  }

  public async findById(id: string): Promise<OtherActivities | null> {
    const otherActivities = this.otherActivities.find(
      (otherActivities) => otherActivities.id === id,
    );
    if (otherActivities) {
      return otherActivities;
    } else return null;
  }

  public async findByIds(
    otherActivities_id: string,
    area_id: string,
  ): Promise<OtherActivities | null> {
    const otherActivities = this.otherActivities.find(
      (otherActivities) =>
        otherActivities.id === otherActivities_id &&
        otherActivities.area_id === area_id,
    );
    if (otherActivities) {
      return otherActivities;
    } else return null;
  }
}

export default OtherActivitiesRepositoryInMemory;
