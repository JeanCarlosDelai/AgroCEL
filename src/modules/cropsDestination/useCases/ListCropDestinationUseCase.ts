import { inject, injectable } from 'tsyringe';
import { ICropRepository } from '@modules/crops/domain/repositories/ICropRepository';
import { ICropDestinationRepository } from '../domain/repositories/ICropDestinationRepository';
import { IListCropDestination } from '../domain/models/IListCropDestination';
@injectable()
class ListCropDestinationUseCase {
  constructor(
    @inject('CropRepository')
    private cropsRepository: ICropRepository,
    @inject('CropDestinationRepository')
    private cropDestinationRepository: ICropDestinationRepository, // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line prettier/prettier
  ) {}

  public async execute(area_id: string): Promise<IListCropDestination> {
    // const cropExist = await this.cropsRepository.findById(area_id);

    // if (!cropExist) {
    //   throw new CustomAPIError.BadRequestError(
    //     'Crop destination does not exists.',
    //   );
    // }

    const cropsDestination =
      await this.cropDestinationRepository.findAll(area_id);

    return cropsDestination;
  }
}

export default ListCropDestinationUseCase;
