import { ICreateProperty } from '../models/ICreateProperty';
import { IProperty } from '../models/IProperty';
import { IPropertyAllOfUser } from '../models/IPropertyAllOfUser';
import { IPropertyPaginate } from '../models/IPropertyPaginate';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IPropertyRepository {
  findAll({ page, skip, take }: SearchParams): Promise<IPropertyPaginate>;
  findAllOfUser(user_Id: string): Promise<IPropertyAllOfUser>;
  findByName(name: string, user_Id: string): Promise<IProperty | null>;
  findByIds(property_id: string, user_Id: string): Promise<IProperty | null>;
  findById(id: string): Promise<IProperty | null>;
  create(data: ICreateProperty): Promise<IProperty>;
  save(area: IProperty): Promise<IProperty>;
  remove(area: IProperty): Promise<void>;
}
