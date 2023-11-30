import CustomAPIError from '@shared/errors';
import { inject, injectable } from 'tsyringe';
import { ICropRepository } from '../domain/repositories/ICropRepository';
import { IUpdateCrop } from '../domain/models/IUpdateCrop';
import { ICrop } from '../domain/models/ICrop';

@injectable()
class UpdateCropUseCase {
  constructor(
    @inject('CropRepository')
    private cropRepository: ICropRepository, // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line prettier/prettier
  ) {}

  public async execute({
    name,
    id,
    area_id,
    quantity,
    crop_date,
    crop_time,
  }: IUpdateCrop): Promise<ICrop> {
    const cropExists = await this.cropRepository.findByIds(id, area_id);

    if (!cropExists) {
      throw new CustomAPIError.BadRequestError('Area or Crop not exist.');
    }

    cropExists.name = name;
    cropExists.quantity = quantity;
    cropExists.crop_date = crop_date;
    cropExists.crop_time = crop_time;

    const crop = await this.cropRepository.save(cropExists);

    return crop;
  }
}

export default UpdateCropUseCase;
