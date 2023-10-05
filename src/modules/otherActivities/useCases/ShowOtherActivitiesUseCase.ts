import { inject, injectable } from 'tsyringe';
import CustomAPIError from '@shared/errors';
import { IOtherActivitiesRepository } from '../domain/repositories/IOtherActivitiesRepository';
import { IShowOtherActivities } from '../domain/models/IShowOtherActivities';
import { IOtherActivities } from '../domain/models/IOtherActivities';

@injectable()
class ShowOtherActivitiesUseCase {
  constructor(
    @inject('OtherActivitiesRepository')
    private otherActivitiesRepository: IOtherActivitiesRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute({
    id,
    area_id,
  }: IShowOtherActivities): Promise<IOtherActivities | null> {
    const otherActivities = await this.otherActivitiesRepository.findByIds(
      id,
      area_id,
    );
    if (!otherActivities) {
      throw new CustomAPIError.BadRequestError(
        'Area or OtherActivities not exist.',
      );
    }

    return otherActivities;
  }
}

export default ShowOtherActivitiesUseCase;
