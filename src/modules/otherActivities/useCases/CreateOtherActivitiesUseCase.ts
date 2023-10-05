import CustomAPIError from '@shared/errors';
import { inject, injectable } from 'tsyringe';
import { IOtherActivitiesRepository } from '../domain/repositories/IOtherActivitiesRepository';
import { IOtherActivities } from '../domain/models/IOtherActivities';
import { ICreateOtherActivities } from '../domain/models/ICreateOtherActivities';

@injectable()
class CreateOtherActivitiesUseCase {
  constructor(
    @inject('OtherActivitiesRepository')
    private otherActivitiesRepository: IOtherActivitiesRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute({
    name,
    area_id,
    description,
    activitie_category,
    activitie_date,
    activitie_time,
  }: ICreateOtherActivities): Promise<IOtherActivities> {
    const otherActivitiesExists =
      await this.otherActivitiesRepository.findByName(name, area_id);

    if (otherActivitiesExists) {
      throw new CustomAPIError.BadRequestError(
        'Other activitie name already used.',
      );
    }

    const otherActivities = await this.otherActivitiesRepository.create({
      name,
      area_id,
      description,
      activitie_category,
      activitie_date,
      activitie_time,
    });

    return otherActivities;
  }
}

export default CreateOtherActivitiesUseCase;
