import { IApplication } from '../models/IApplication';
import { ICreateApplication } from '../models/ICreateApplication';
import { IListApplication } from '../models/IListApplication';

export interface IApplicationRepository {
  findAll(area_Id: string): Promise<IListApplication>;
  findByIds(
    application_id: string,
    area_id: string,
  ): Promise<IApplication | null>;
  findById(id: string): Promise<IApplication | null>;
  create(data: ICreateApplication): Promise<IApplication>;
  save(application: IApplication): Promise<IApplication>;
  remove(application: IApplication): Promise<void>;
}
