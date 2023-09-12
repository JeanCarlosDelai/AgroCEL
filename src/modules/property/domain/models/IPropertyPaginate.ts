import { IProperty } from './IProperty';

export interface IPropertyPaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: IProperty[];
}
