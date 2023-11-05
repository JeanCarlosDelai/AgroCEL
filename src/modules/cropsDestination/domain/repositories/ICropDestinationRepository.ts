import { ICreateCropDestination } from '../models/ICreateCropDestination';
import { ICropDestination } from '../models/ICropDestination';
import { IListCropDestination } from '../models/IListCropDestination';

export interface ICropDestinationRepository {
  findAll(area_id: string): Promise<IListCropDestination>;
  findByName(name: string, crop_id: string): Promise<ICropDestination | null>;
  findByIds(id: string, crop_id: string): Promise<ICropDestination | null>;
  findById(id: string): Promise<ICropDestination | null>;
  create(data: ICreateCropDestination): Promise<ICropDestination>;
  save(cropDestination: ICropDestination): Promise<ICropDestination>;
  remove(cropDestination: ICropDestination): Promise<void>;
}
