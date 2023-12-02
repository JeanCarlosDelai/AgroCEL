import { IArea } from '../models/IArea';
import { IListArea } from '../models/IListArea';
import { ICreateArea } from '../models/ICreateArea';

export interface IAreaRepository {
  findAll(property_Id: string): Promise<IListArea>;
  findByName(name: string, property_id: string): Promise<IArea | null>;
  findByIds(area_id: string, property_id: string): Promise<IArea | null>;
  findById(id: string): Promise<IArea | null>;
  create(data: ICreateArea): Promise<IArea>;
  save(area: IArea): Promise<IArea>;
  remove(area: IArea): Promise<void>;
}
