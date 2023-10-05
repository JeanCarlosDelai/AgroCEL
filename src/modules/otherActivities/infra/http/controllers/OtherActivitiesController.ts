import CreateOtherActivitiesUseCase from '@modules/otherActivities/useCases/CreateOtherActivitiesUseCase';
import DeleteOtherActivitiesUseCase from '@modules/otherActivities/useCases/DeleteOtherActivitiesUseCase';
import ListOtherActivitiesUseCase from '@modules/otherActivities/useCases/ListOtherActivitiesUseCase';
import ShowOtherActivitiesUseCase from '@modules/otherActivities/useCases/ShowOtherActivitiesUseCase';
import UpdateOtherActivitiesUseCase from '@modules/otherActivities/useCases/UpdateOtherActivitiesUseCase';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';

export default class OtherActivitiesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const area_id = request.params.area_id;

    const listOtherActivities = container.resolve(ListOtherActivitiesUseCase);
    const OtherActivities = await listOtherActivities.execute(area_id);

    return response.status(StatusCodes.OK).json(OtherActivities);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      activitie_category,
      activitie_date,
      activitie_time,
    } = request.body;
    const area_id = request.params.area_id;

    const createOtherActivities = container.resolve(
      CreateOtherActivitiesUseCase,
    );

    const otherActivities = await createOtherActivities.execute({
      name,
      area_id,
      description,
      activitie_category,
      activitie_date,
      activitie_time,
    });

    return response.status(StatusCodes.CREATED).json(otherActivities);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const area_id = request.params.area_id;
    const id = request.params.other_ativities_id;
    const {
      name,
      description,
      activitie_category,
      activitie_date,
      activitie_time,
    } = request.body;

    const updateOtherActivities = container.resolve(
      UpdateOtherActivitiesUseCase,
    );

    const otherActivities = await updateOtherActivities.execute({
      id,
      name,
      area_id,
      description,
      activitie_category,
      activitie_date,
      activitie_time,
    });

    return response.status(StatusCodes.OK).json(otherActivities);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params.other_ativities_id;
    const area_id = request.params.area_id;
    const showOtherActivities = container.resolve(ShowOtherActivitiesUseCase);

    const otherActivities = await showOtherActivities.execute({ id, area_id });

    return response.status(StatusCodes.OK).json(otherActivities);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params.other_ativities_id;
    const area_id = request.params.area_id;

    const deleteOtherActivities = container.resolve(
      DeleteOtherActivitiesUseCase,
    );

    await deleteOtherActivities.execute({ id, area_id });

    return response.sendStatus(StatusCodes.NO_CONTENT);
  }
}
