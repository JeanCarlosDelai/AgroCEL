import { inject, injectable } from 'tsyringe';
import CustomAPIError from '@shared/errors';
import { ICropRepository } from '@modules/crops/domain/repositories/ICropRepository';
import { ICropSaleRepository } from '../domain/repositories/ICropSaleRepository';
import { IListCropSale } from '../domain/models/IListCropSale';
@injectable()
class ListCropSaleUseCase {
  constructor(
    @inject('CropRepository')
    private cropsRepository: ICropRepository,
    @inject('CropSaleRepository')
    private cropSaleRepository: ICropSaleRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute(crop_Id: string): Promise<IListCropSale> {
    const cropSaleExist = await this.cropsRepository.findById(crop_Id);

    if (!cropSaleExist) {
      throw new CustomAPIError.BadRequestError('Crop sale does not exists.');
    }

    const cropSale = await this.cropSaleRepository.findAll(crop_Id);

    return cropSale;
  }
}

export default ListCropSaleUseCase;
