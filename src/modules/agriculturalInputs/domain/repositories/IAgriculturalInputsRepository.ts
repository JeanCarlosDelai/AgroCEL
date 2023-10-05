import { IAgriculturalInputs } from '../models/IAgriculturalInputs';
import { ICreateAgriculturalInputs } from '../models/ICreateAgriculturalInputs';
import { IListAgriculturalInputs } from '../models/IListAgriculturalInputs';

export interface IAgriculturalInputsRepository {
  findAll(): Promise<IListAgriculturalInputs>;
  findById(id: string): Promise<IAgriculturalInputs | null>;
  create(data: ICreateAgriculturalInputs): Promise<IAgriculturalInputs>;
  save(application: IAgriculturalInputs): Promise<IAgriculturalInputs>;
}
