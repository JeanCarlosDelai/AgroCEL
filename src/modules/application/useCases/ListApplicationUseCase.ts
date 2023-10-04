import { inject, injectable } from 'tsyringe';
import CustomAPIError from '@shared/errors';
import { IApplicationRepository } from '../domain/repositories/IApplicationRepository';
import { IAreaRepository } from '@modules/area/domain/repositories/IAreaRepository';
import { IListApplication } from '../domain/models/IListApplication';

@injectable()
class ListApplicationUseCase {
  constructor(
    @inject('ApplicationRepository')
    private applicationRepository: IApplicationRepository,
    @inject('AreaRepository')
    private areaRepository: IAreaRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute(area_Id: string): Promise<IListApplication> {
    const areaExist = await this.areaRepository.findById(area_Id);

    if (!areaExist) {
      throw new CustomAPIError.BadRequestError('Area does not exists.');
    }

    const applications = await this.applicationRepository.findAll(area_Id);

    return applications;
  }
}

export default ListApplicationUseCase;
