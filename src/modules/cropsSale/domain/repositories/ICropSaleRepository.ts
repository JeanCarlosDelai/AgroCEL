import { ICreateCropSale } from '../models/ICreateCropSale';
import { ICropSale } from '../models/ICropSale';
import { IListCropSale } from '../models/IListCropSale';

export interface ICropSaleRepository {
  findAll(area_id: string): Promise<IListCropSale>;
  findByName(name: string, crop_id: string): Promise<ICropSale | null>;
  findByIds(id: string, crop_id: string): Promise<ICropSale | null>;
  findById(id: string): Promise<ICropSale | null>;
  create(data: ICreateCropSale): Promise<ICropSale>;
  save(cropSale: ICropSale): Promise<ICropSale>;
  remove(cropSale: ICropSale): Promise<void>;
}
