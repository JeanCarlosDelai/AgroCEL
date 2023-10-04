import { inject, injectable } from 'tsyringe';
import CustomAPIError from '@shared/errors';
import { IApplicationRepository } from '../domain/repositories/IApplicationRepository';
import { IDeleteApplication } from '../domain/models/IDeleteApplication';

@injectable()
class DeleteApplicationUseCase {
  constructor(
    @inject('ApplicationRepository')
    private applicationRepository: IApplicationRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute({ id, area_id }: IDeleteApplication): Promise<void> {
    const application = await this.applicationRepository.findByIds(id, area_id);

    if (!application) {
      throw new CustomAPIError.BadRequestError('Application not found.');
    }

    await this.applicationRepository.remove(application);
  }
}

export default DeleteApplicationUseCase;
