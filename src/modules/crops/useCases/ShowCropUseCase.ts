import { inject, injectable } from 'tsyringe';
import CustomAPIError from '@shared/errors';
import { ICropRepository } from '../domain/repositories/ICropRepository';
import { IShowCrop } from '../domain/models/IShowCrop';
import { ICrop } from '../domain/models/ICrop';

@injectable()
class ShowCropUseCase {
  constructor(
    @inject('CropRepository')
    private cropsRepository: ICropRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute({ id, area_id }: IShowCrop): Promise<ICrop | null> {
    const area = await this.cropsRepository.findByIds(id, area_id);
    if (!area) {
      throw new CustomAPIError.BadRequestError('Area or Crop not exist.');
    }

    return area;
  }
}

export default ShowCropUseCase;
