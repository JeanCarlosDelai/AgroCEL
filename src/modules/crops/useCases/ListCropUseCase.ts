import { inject, injectable } from 'tsyringe';
import CustomAPIError from '@shared/errors';
import { ICropRepository } from '../domain/repositories/ICropRepository';
import { IAreaRepository } from '@modules/area/domain/repositories/IAreaRepository';
import { IListCrop } from '../domain/models/IListCrop';

@injectable()
class ListCropUseCase {
  constructor(
    @inject('CropRepository')
    private cropsRepository: ICropRepository,
    @inject('AreaRepository')
    private areaRepository: IAreaRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute(area_Id: string): Promise<IListCrop> {
    const areaExist = await this.areaRepository.findById(area_Id);

    if (!areaExist) {
      throw new CustomAPIError.BadRequestError('Crop does not exists.');
    }

    const crops = await this.cropsRepository.findAll(area_Id);

    return crops;
  }
}

export default ListCropUseCase;
