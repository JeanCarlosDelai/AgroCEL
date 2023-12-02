import CustomAPIError from '@shared/errors';
import { inject, injectable } from 'tsyringe';
import { ICropRepository } from '../domain/repositories/ICropRepository';
import { ICreateCrop } from '../domain/models/ICreateCrop';
import { ICrop } from '../domain/models/ICrop';

@injectable()
class CreateCropUseCase {
  constructor(
    @inject('CropRepository')
    private cropRepository: ICropRepository, // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line prettier/prettier
  ) {}

  public async execute({
    name,
    area_id,
    quantity,
    crop_date,
    crop_time,
  }: ICreateCrop): Promise<ICrop> {
    const cropExists = await this.cropRepository.findByName(name, area_id);

    if (cropExists) {
      throw new CustomAPIError.BadRequestError('Crop name already used.');
    }

    const crop = await this.cropRepository.create({
      name,
      area_id,
      quantity,
      crop_date,
      crop_time,
    });

    return crop;
  }
}

export default CreateCropUseCase;
