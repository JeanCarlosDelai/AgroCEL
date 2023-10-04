import CustomAPIError from '@shared/errors';
import { inject, injectable } from 'tsyringe';
import { ICropDestinationRepository } from '../domain/repositories/ICropDestinationRepository';
import { IUpdateCropDestination } from '../domain/models/IUpdateCropDestination';
import { ICropDestination } from '../domain/models/ICropDestination';

@injectable()
class UpdateCropDestinationUseCase {
  constructor(
    @inject('CropDestinationRepository')
    private cropDestinationRepository: ICropDestinationRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute({
    id,
    name,
    area_id,
    crop_id,
    quantity,
    destination,
    processing_type,
  }: IUpdateCropDestination): Promise<ICropDestination> {
    const cropDestinationExists =
      await this.cropDestinationRepository.findByIds(id, crop_id);

    if (!cropDestinationExists) {
      throw new CustomAPIError.BadRequestError(
        'Crop destination or Crop not exist.',
      );
    }

    cropDestinationExists.name = name;
    cropDestinationExists.quantity = quantity;
    cropDestinationExists.area_id = area_id;
    cropDestinationExists.crop_id = crop_id;
    cropDestinationExists.destination = destination;
    cropDestinationExists.processing_type = processing_type;

    const cropDestination = await this.cropDestinationRepository.save(
      cropDestinationExists,
    );

    return cropDestination;
  }
}

export default UpdateCropDestinationUseCase;
