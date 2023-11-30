import { inject, injectable } from 'tsyringe';
import CustomAPIError from '@shared/errors';
import { ICropSaleRepository } from '../domain/repositories/ICropSaleRepository';
import { IShowCropSale } from '../domain/models/IShowCropSale';
import { ICropSale } from '../domain/models/ICropSale';

@injectable()
class ShowCropSaleUseCase {
  constructor(
    @inject('CropSaleRepository')
    private cropsSaleRepository: ICropSaleRepository, // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line prettier/prettier
  ) {}

  public async execute({
    id,
    crop_id,
  }: IShowCropSale): Promise<ICropSale | null> {
    const cropSale = await this.cropsSaleRepository.findByIds(id, crop_id);
    if (!cropSale) {
      throw new CustomAPIError.BadRequestError('Crop sale or Crop not exist.');
    }

    return cropSale;
  }
}

export default ShowCropSaleUseCase;
