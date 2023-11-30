import { inject, injectable } from 'tsyringe';
import CustomAPIError from '@shared/errors';
import { ICropDestinationRepository } from '../domain/repositories/ICropDestinationRepository';
import { IDeleteCropDestination } from '../domain/models/IDeleteCropDestination';

@injectable()
class DeleteCropDestinationUseCase {
  constructor(
    @inject('CropDestinationRepository')
    private cropDestinationRepository: ICropDestinationRepository, // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line prettier/prettier
  ) {}

  public async execute({ id, crop_id }: IDeleteCropDestination): Promise<void> {
    const cropDestination = await this.cropDestinationRepository.findByIds(
      id,
      crop_id,
    );

    if (!cropDestination) {
      throw new CustomAPIError.BadRequestError('Crop destination not found.');
    }

    await this.cropDestinationRepository.remove(cropDestination);
  }
}

export default DeleteCropDestinationUseCase;
