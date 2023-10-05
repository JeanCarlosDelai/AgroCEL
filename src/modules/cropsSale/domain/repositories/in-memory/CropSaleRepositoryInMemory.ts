import CropSale from '@modules/cropsSale/typeorm/entities/CropSale';
import { v4 as uuidv4 } from 'uuid';
import { ICropSaleRepository } from '../ICropSaleRepository';
import { ICreateCropSale } from '../../models/ICreateCropSale';
import { IListCropSale } from '../../models/IListCropSale';

class CropSaleRepositoryInMemory implements ICropSaleRepository {
  private cropSale: CropSale[] = [];

  public async create({
    name,
    area_id,
    crop_id,
    quantity,
    purchasing_entity,
    purchasing_entity_cnpj,
    graduation,
    price,
    discharge_date,
  }: ICreateCropSale): Promise<CropSale> {
    const croSale = new CropSale();

    croSale.id = uuidv4();
    croSale.name = name;
    croSale.area_id = area_id;
    croSale.crop_id = crop_id;
    croSale.quantity = quantity;
    croSale.purchasing_entity = purchasing_entity;
    croSale.purchasing_entity_cnpj = purchasing_entity_cnpj;
    croSale.discharge_date = discharge_date;
    croSale.price = price;
    croSale.graduation = graduation;

    this.cropSale.push(croSale);

    return croSale;
  }

  public async save(croSale: CropSale): Promise<CropSale> {
    const findIndex = this.cropSale.findIndex(
      (findCroSale) => findCroSale.id === croSale.id,
    );

    this.cropSale[findIndex] = croSale;

    return croSale;
  }

  public async remove(cropDestination: CropSale): Promise<void> {
    const cropSaleIndex = this.cropSale.findIndex(
      (findcroSale) => findcroSale.id === cropDestination.id,
    );

    this.cropSale.splice(cropSaleIndex, 1);
  }

  public async findAll(crop_id: string): Promise<IListCropSale> {
    const cropSale: CropSale[] = this.cropSale.filter(
      (crop) => crop.crop_id === crop_id,
    );

    return { data: cropSale };
  }

  public async findByName(
    name: string,
    crop_id: string,
  ): Promise<CropSale | null> {
    const cropSale = this.cropSale.find(
      (cropSale) => cropSale.name === name && cropSale.crop_id === crop_id,
    );
    if (cropSale) {
      return cropSale;
    } else return null;
  }

  public async findById(id: string): Promise<CropSale | null> {
    const cropSale = this.cropSale.find((cropSale) => cropSale.id === id);
    if (cropSale) {
      return cropSale;
    } else return null;
  }

  public async findByIds(
    id: string,
    crop_id: string,
  ): Promise<CropSale | null> {
    const cropSale = this.cropSale.find(
      (cropSale) => cropSale.id === id && cropSale.crop_id === crop_id,
    );
    if (cropSale) {
      return cropSale;
    } else return null;
  }
}

export default CropSaleRepositoryInMemory;
