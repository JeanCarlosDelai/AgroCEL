import { ICreateCrop } from '../models/ICreateCrop';
import { ICrop } from '../models/ICrop';
import { IListCrop } from '../models/IListCrop';

export interface IAreaRepository {
  findAll(area_Id: string): Promise<IListCrop>;
  findByName(name: string, area_id: string): Promise<ICrop | null>;
  findByIds(crop_id: string, area_id: string): Promise<ICrop | null>;
  findById(id: string): Promise<ICrop | null>;
  create(data: ICreateCrop): Promise<ICrop>;
  save(crop: ICrop): Promise<ICrop>;
  remove(crop: ICrop): Promise<void>;
}
