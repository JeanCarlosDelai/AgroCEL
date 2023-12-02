import CustomAPIError from '@shared/errors';
import { inject, injectable } from 'tsyringe';
import { ICropSaleRepository } from '../domain/repositories/ICropSaleRepository';
import { ICreateCropSale } from '../domain/models/ICreateCropSale';
import { ICropSale } from '../domain/models/ICropSale';

@injectable()
class CreateCropSaleUseCase {
  constructor(
    @inject('CropSaleRepository')
    private cropSaleRepository: ICropSaleRepository, // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line prettier/prettier
  ) {}

  public async execute({
    name,
    area_id,
    crop_id,
    quantity,
    purchasing_entity,
    purchasing_entity_cnpj,
    graduation,
    price,
    discharge_date,
  }: ICreateCropSale): Promise<ICropSale> {
    const cropSaleExists = await this.cropSaleRepository.findByName(
      name,
      crop_id,
    );

    if (cropSaleExists) {
      throw new CustomAPIError.BadRequestError('Crop Sale name already used.');
    }

    const cropSale = await this.cropSaleRepository.create({
      name,
      area_id,
      crop_id,
      quantity,
      purchasing_entity,
      purchasing_entity_cnpj,
      graduation,
      price,
      discharge_date,
    });

    return cropSale;
  }
}

export default CreateCropSaleUseCase;
