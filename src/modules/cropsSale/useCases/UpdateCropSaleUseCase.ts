import CustomAPIError from '@shared/errors';
import { inject, injectable } from 'tsyringe';
import { ICropSaleRepository } from '../domain/repositories/ICropSaleRepository';
import { IUpdateCropSale } from '../domain/models/IUpdateCropSale';
import { ICropSale } from '../domain/models/ICropSale';

@injectable()
class UpdateCropSaleUseCase {
  constructor(
    @inject('CropSaleRepository')
    private cropSaleRepository: ICropSaleRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute({
    id,
    name,
    area_id,
    crop_id,
    quantity,
    purchasing_entity,
    purchasing_entity_cnpj,
    graduation,
    price,
    discharge_date,
  }: IUpdateCropSale): Promise<ICropSale> {
    const cropSaleExists = await this.cropSaleRepository.findByIds(id, crop_id);

    if (!cropSaleExists) {
      throw new CustomAPIError.BadRequestError('Crop sale or Crop not exist.');
    }

    cropSaleExists.name = name;
    cropSaleExists.quantity = quantity;
    cropSaleExists.area_id = area_id;
    cropSaleExists.crop_id = crop_id;
    cropSaleExists.purchasing_entity = purchasing_entity;
    cropSaleExists.purchasing_entity_cnpj = purchasing_entity_cnpj;
    cropSaleExists.graduation = graduation;
    cropSaleExists.price = price;
    cropSaleExists.discharge_date = discharge_date;

    const cropSale = await this.cropSaleRepository.save(cropSaleExists);

    return cropSale;
  }
}

export default UpdateCropSaleUseCase;
