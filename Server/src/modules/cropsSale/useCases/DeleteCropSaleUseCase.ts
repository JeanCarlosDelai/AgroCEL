import { inject, injectable } from 'tsyringe';
import CustomAPIError from '@shared/errors';
import { ICropSaleRepository } from '../domain/repositories/ICropSaleRepository';
import { IDeleteCropSale } from '../domain/models/IDeleteCropSale';

@injectable()
class DeleteCropSaleUseCase {
  constructor(
    @inject('CropSaleRepository')
    private cropSaleRepository: ICropSaleRepository, // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line prettier/prettier
  ) {}

  public async execute({ id, crop_id }: IDeleteCropSale): Promise<void> {
    const cropSale = await this.cropSaleRepository.findByIds(id, crop_id);

    if (!cropSale) {
      throw new CustomAPIError.BadRequestError('Crop sale not found.');
    }

    await this.cropSaleRepository.remove(cropSale);
  }
}

export default DeleteCropSaleUseCase;
