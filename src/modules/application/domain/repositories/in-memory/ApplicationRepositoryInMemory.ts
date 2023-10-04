import { v4 as uuidv4 } from 'uuid';
import { IApplicationRepository } from '../IApplicationRepository';
import { ICreateApplication } from '../../models/ICreateApplication';
import Application from '@modules/application/infra/typeorm/entities/Application';
import { IListApplication } from '../../models/IListApplication';

class ApplicationRepositoryInMemory implements IApplicationRepository {
  private applications: Application[] = [];

  public async create({
    area_id,
    used_product_id,
    quantity,
    application_type,
    application_date,
    application_time,
    description,
  }: ICreateApplication): Promise<Application> {
    const area = new Application();

    area.id = uuidv4();
    area.area_id = area_id;
    area.used_product_id = used_product_id;
    area.application_type = application_type;
    area.quantity = quantity;
    area.description = description;
    area.application_date = application_date;
    area.application_time = application_time;

    this.applications.push(area);

    return area;
  }

  public async save(application: Application): Promise<Application> {
    const findIndex = this.applications.findIndex(
      (findApplication) => findApplication.id === application.id,
    );

    this.applications[findIndex] = application;

    return application;
  }

  public async remove(application: Application): Promise<void> {
    const cropIndex = this.applications.findIndex(
      (findApplication) => findApplication.id === application.id,
    );

    this.applications.splice(cropIndex, 1);
  }

  public async findAll(area_id: string): Promise<IListApplication> {
    const applications: Application[] = this.applications.filter(
      (application) => application.area_id === area_id,
    );

    return { data: applications };
  }

  public async findById(id: string): Promise<Application | null> {
    const application = this.applications.find(
      (application) => application.id === id,
    );
    if (application) {
      return application;
    } else return null;
  }

  public async findByIds(
    application_id: string,
    area_id: string,
  ): Promise<Application | null> {
    const application = this.applications.find(
      (application) =>
        application.id === application_id && application.area_id === area_id,
    );
    if (application) {
      return application;
    } else return null;
  }
}

export default ApplicationRepositoryInMemory;
