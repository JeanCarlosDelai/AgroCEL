import CustomAPIError from '@shared/errors';
import { inject, injectable } from 'tsyringe';
import { IOtherActivitiesRepository } from '../domain/repositories/IOtherActivitiesRepository';
import { IUpdateOtherActivities } from '../domain/models/IUpdateOtherActivities';
import { IOtherActivities } from '../domain/models/IOtherActivities';

@injectable()
class UpdateOtherActivitiesUseCase {
  constructor(
    @inject('OtherActivitiesRepository')
    private otherActivitiesRepository: IOtherActivitiesRepository, // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line prettier/prettier
  ) {}

  public async execute({
    name,
    id,
    area_id,
    description,
    activitie_category,
    activitie_date,
    activitie_time,
  }: IUpdateOtherActivities): Promise<IOtherActivities> {
    const otherActivitiesExists =
      await this.otherActivitiesRepository.findByIds(id, area_id);

    if (!otherActivitiesExists) {
      throw new CustomAPIError.BadRequestError(
        'Area or OtherActivities not exist.',
      );
    }

    otherActivitiesExists.area_id = area_id;
    otherActivitiesExists.name = name;
    otherActivitiesExists.description = description;
    otherActivitiesExists.activitie_category = activitie_category;
    otherActivitiesExists.activitie_date = activitie_date;
    otherActivitiesExists.activitie_time = activitie_time;

    const otherActivities = await this.otherActivitiesRepository.save(
      otherActivitiesExists,
    );

    return otherActivities;
  }
}

export default UpdateOtherActivitiesUseCase;
