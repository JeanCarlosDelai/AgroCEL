import { inject, injectable } from 'tsyringe';
import CustomAPIError from '@shared/errors';
import { IAreaRepository } from '@modules/area/domain/repositories/IAreaRepository';
import { IOtherActivitiesRepository } from '../domain/repositories/IOtherActivitiesRepository';
import { IListOtherActivities } from '../domain/models/IListOtherActivities';

@injectable()
class ListOtherActivitiesUseCase {
  constructor(
    @inject('OtherActivitiesRepository')
    private otherActivitiesRepository: IOtherActivitiesRepository,
    @inject('AreaRepository')
    private areaRepository: IAreaRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute(area_Id: string): Promise<IListOtherActivities> {
    const areaExist = await this.areaRepository.findById(area_Id);

    if (!areaExist) {
      throw new CustomAPIError.BadRequestError('Area does not exists.');
    }

    const otherActivities =
      await this.otherActivitiesRepository.findAll(area_Id);

    return otherActivities;
  }
}

export default ListOtherActivitiesUseCase;
