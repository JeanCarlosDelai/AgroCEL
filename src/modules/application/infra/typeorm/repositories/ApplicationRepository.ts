import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';
import { IApplicationRepository } from '@modules/application/domain/repositories/IApplicationRepository';
import Application from '../entities/Application';
import { ICreateApplication } from '@modules/application/domain/models/ICreateApplication';
import { IApplication } from '@modules/application/domain/models/IApplication';
import { IListApplication } from '@modules/application/domain/models/IListApplication';

class ApplicationRepository implements IApplicationRepository {
  private ormRepository: Repository<Application>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Application);
  }
  public async create({
    area_id,
    used_product_id,
    quantity,
    application_type,
    application_date,
    application_time,
    description,
  }: ICreateApplication): Promise<IApplication> {
    const application = this.ormRepository.create({
      area_id,
      used_product_id,
      quantity,
      application_type,
      application_date,
      application_time,
      description,
    });

    await this.ormRepository.save(application);

    return application;
  }

  public async save(application: IApplication): Promise<IApplication> {
    await this.ormRepository.save(application);

    return application;
  }

  public async remove(application: Application): Promise<void> {
    await this.ormRepository.remove(application);
  }

  public async findAll(area_Id: string): Promise<IListApplication> {
    const applications = await this.ormRepository
      .createQueryBuilder('applications')
      .where('applications.area_id = :area_Id', { area_Id })
      .getMany();

    const result = {
      data: applications,
    };

    return result;
  }

  public async findByIds(
    id: string,
    area_id: string,
  ): Promise<IApplication | null> {
    const applications = await this.ormRepository.findOne({
      where: {
        id,
        area_id,
      },
    });

    return applications;
  }
  public async findById(id: string): Promise<IApplication | null> {
    const applications = await this.ormRepository.findOneBy({
      id,
    });

    return applications;
  }
}

export default ApplicationRepository;
