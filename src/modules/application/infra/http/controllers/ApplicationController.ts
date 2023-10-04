import CreateApplicationUseCase from '@modules/application/useCases/CreateApplicationUseCase';
import DeleteApplicationUseCase from '@modules/application/useCases/DeleteApplicationUseCase';
import ListApplicationUseCase from '@modules/application/useCases/ListApplicationUseCase';
import ShowApplicationUseCase from '@modules/application/useCases/ShowApplicationUseCase';
import UpdateApplicationUseCase from '@modules/application/useCases/UpdateApplicationUseCase';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';

export default class ApplicationController {
  public async index(request: Request, response: Response): Promise<Response> {
    const area_id = request.params.area_id;

    const listApplications = container.resolve(ListApplicationUseCase);
    const applications = await listApplications.execute(area_id);

    return response.status(StatusCodes.OK).json(applications);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      application_date,
      quantity,
      application_type,
      application_time,
      description,
      used_product_id,
    } = request.body;
    const area_id = request.params.area_id;

    const createApplication = container.resolve(CreateApplicationUseCase);

    const application = await createApplication.execute({
      area_id,
      used_product_id,
      quantity,
      application_type,
      application_date,
      application_time,
      description,
    });

    return response.status(StatusCodes.CREATED).json(application);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const area_id = request.params.area_id;
    const id = request.params.application_id;
    const {
      used_product_id,
      quantity,
      application_type,
      application_date,
      application_time,
      description,
    } = request.body;

    const updateApplication = container.resolve(UpdateApplicationUseCase);

    const application = await updateApplication.execute({
      id,
      area_id,
      used_product_id,
      quantity,
      application_type,
      application_date,
      application_time,
      description,
    });

    return response.status(StatusCodes.OK).json(application);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params.application_id;
    const area_id = request.params.area_id;
    const showApplication = container.resolve(ShowApplicationUseCase);

    const application = await showApplication.execute({ id, area_id });

    return response.status(StatusCodes.OK).json(application);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params.application_id;
    const area_id = request.params.area_id;

    const deleteApplication = container.resolve(DeleteApplicationUseCase);

    await deleteApplication.execute({ id, area_id });

    return response.sendStatus(StatusCodes.NO_CONTENT);
  }
}
