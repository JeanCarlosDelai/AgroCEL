import { inject, injectable } from 'tsyringe';
import CustomAPIError from '@shared/errors';
import { IApplicationRepository } from '../domain/repositories/IApplicationRepository';
import { IShowApplication } from '../domain/models/IShowApplication';
import { IApplication } from '../domain/models/IApplication';

@injectable()
class ShowApplicationUseCase {
  constructor(
    @inject('ApplicationRepository')
    private aplicationRepository: IApplicationRepository, // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line prettier/prettier
  ) {}

  public async execute({
    id,
    area_id,
  }: IShowApplication): Promise<IApplication | null> {
    const application = await this.aplicationRepository.findByIds(id, area_id);
    if (!application) {
      throw new CustomAPIError.BadRequestError(
        'Area or Application not exist.',
      );
    }

    return application;
  }
}

export default ShowApplicationUseCase;
