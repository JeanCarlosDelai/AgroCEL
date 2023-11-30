import CustomAPIError from '@shared/errors';
import { inject, injectable } from 'tsyringe';
import { ICropDestinationRepository } from '../domain/repositories/ICropDestinationRepository';
import { ICreateCropDestination } from '../domain/models/ICreateCropDestination';
import { ICropDestination } from '../domain/models/ICropDestination';

@injectable()
class CreateCropDestinationUseCase {
  constructor(
    @inject('CropDestinationRepository')
    private cropDestinationRepository: ICropDestinationRepository, // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line prettier/prettier
  ) {}

  public async execute({
    name,
    area_id,
    crop_id,
    quantity,
    destination,
    processing_type,
  }: ICreateCropDestination): Promise<ICropDestination> {
    const cropDestinationExists =
      await this.cropDestinationRepository.findByName(name, crop_id);

    if (cropDestinationExists) {
      throw new CustomAPIError.BadRequestError(
        'Crop Destination name already used.',
      );
    }

    const cropDestination = await this.cropDestinationRepository.create({
      name,
      area_id,
      crop_id,
      quantity,
      destination,
      processing_type,
    });

    return cropDestination;
  }
}

export default CreateCropDestinationUseCase;
