import { inject, injectable } from 'tsyringe';
import CustomAPIError from '@shared/errors';
import { ICropDestinationRepository } from '../domain/repositories/ICropDestinationRepository';
import { IShowCropDestination } from '../domain/models/IShowCropDestination';
import { ICropDestination } from '../domain/models/ICropDestination';

@injectable()
class ShowCropDestinationUseCase {
  constructor(
    @inject('CropDestinationRepository')
    private cropsDestinationRepository: ICropDestinationRepository, // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line prettier/prettier
  ) {}

  public async execute({
    id,
    crop_id,
  }: IShowCropDestination): Promise<ICropDestination | null> {
    const cropDestination = await this.cropsDestinationRepository.findByIds(
      id,
      crop_id,
    );
    if (!cropDestination) {
      throw new CustomAPIError.BadRequestError(
        'Crop destination or Crop not exist.',
      );
    }

    return cropDestination;
  }
}

export default ShowCropDestinationUseCase;
