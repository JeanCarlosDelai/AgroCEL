import { ICreateOtherActivities } from '../models/ICreateOtherActivities';
import { IListOtherActivities } from '../models/IListOtherActivities';
import { IOtherActivities } from '../models/IOtherActivities';

export interface IOtherActivitiesRepository {
  findAll(area_Id: string): Promise<IListOtherActivities>;
  findByName(name: string, area_id: string): Promise<IOtherActivities | null>;
  findByIds(
    other_activities_id: string,
    area_id: string,
  ): Promise<IOtherActivities | null>;
  findById(id: string): Promise<IOtherActivities | null>;
  create(data: ICreateOtherActivities): Promise<IOtherActivities>;
  save(other_activities: IOtherActivities): Promise<IOtherActivities>;
  remove(other_activities: IOtherActivities): Promise<void>;
}
