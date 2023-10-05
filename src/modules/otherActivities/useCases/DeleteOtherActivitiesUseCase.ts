import { inject, injectable } from 'tsyringe';
import CustomAPIError from '@shared/errors';
import { IOtherActivitiesRepository } from '../domain/repositories/IOtherActivitiesRepository';
import { IDeleteOtherActivities } from '../domain/models/IDeleteOtherActivities';

@injectable()
class DeleteOtherActivitiesUseCase {
  constructor(
    @inject('OtherActivitiesRepository')
    private otherActivitiesRepository: IOtherActivitiesRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute({ id, area_id }: IDeleteOtherActivities): Promise<void> {
    const otherActivities = await this.otherActivitiesRepository.findByIds(
      id,
      area_id,
    );

    if (!otherActivities) {
      throw new CustomAPIError.BadRequestError('OtherActivities not found.');
    }

    await this.otherActivitiesRepository.remove(otherActivities);
  }
}

export default DeleteOtherActivitiesUseCase;
