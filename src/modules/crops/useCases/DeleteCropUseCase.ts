import { inject, injectable } from 'tsyringe';
import CustomAPIError from '@shared/errors';
import { ICropRepository } from '../domain/repositories/ICropRepository';
import { IDeleteCrop } from '../domain/models/IDeleteCrop';

@injectable()
class DeleteCropUseCase {
  constructor(
    @inject('CropRepository')
    private cropRepository: ICropRepository, // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line prettier/prettier
  ) {}

  public async execute({ id, area_id }: IDeleteCrop): Promise<void> {
    const crop = await this.cropRepository.findByIds(id, area_id);

    if (!crop) {
      throw new CustomAPIError.BadRequestError('Crop not found.');
    }

    await this.cropRepository.remove(crop);
  }
}

export default DeleteCropUseCase;
