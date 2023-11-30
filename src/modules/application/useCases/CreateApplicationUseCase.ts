import { inject, injectable } from 'tsyringe';
import { IApplicationRepository } from '../domain/repositories/IApplicationRepository';
import { ICreateApplication } from '../domain/models/ICreateApplication';
import { IApplication } from '../domain/models/IApplication';

@injectable()
class CreateApplicationUseCase {
  constructor(
    @inject('ApplicationRepository')
    private applicationRepository: IApplicationRepository, // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line prettier/prettier
  ) {}

  public async execute({
    area_id,
    used_product,
    quantity,
    application_type,
    application_date,
    application_time,
    description,
  }: ICreateApplication): Promise<IApplication> {
    const application = await this.applicationRepository.create({
      area_id,
      used_product,
      quantity,
      application_type,
      application_date,
      application_time,
      description,
    });

    return application;
  }
}

export default CreateApplicationUseCase;
