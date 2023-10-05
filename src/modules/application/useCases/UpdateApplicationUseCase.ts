import CustomAPIError from '@shared/errors';
import { inject, injectable } from 'tsyringe';
import { IApplicationRepository } from '../domain/repositories/IApplicationRepository';
import { IUpdateApplication } from '../domain/models/IUpdateApplication';
import { IApplication } from '../domain/models/IApplication';

@injectable()
class UpdateApplicationUseCase {
  constructor(
    @inject('ApplicationRepository')
    private applicationRepository: IApplicationRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute({
    id,
    area_id,
    used_product,
    quantity,
    application_type,
    application_date,
    application_time,
    description,
  }: IUpdateApplication): Promise<IApplication> {
    const applicationExists = await this.applicationRepository.findByIds(
      id,
      area_id,
    );

    if (!applicationExists) {
      throw new CustomAPIError.BadRequestError('Area or Crop not exist.');
    }

    applicationExists.used_product = used_product;
    applicationExists.quantity = quantity;
    applicationExists.application_type = application_type;
    applicationExists.application_date = application_date;
    applicationExists.application_time = application_time;
    applicationExists.description = description;

    const application =
      await this.applicationRepository.save(applicationExists);

    return application;
  }
}

export default UpdateApplicationUseCase;
