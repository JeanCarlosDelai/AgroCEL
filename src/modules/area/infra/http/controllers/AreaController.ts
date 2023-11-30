import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';
import CreateAreaUseCase from '@modules/area/useCases/CreateAreaUseCase';
import ListAreaUseCase from '@modules/area/useCases/ListAreaUseCase';
import ShowAreaUseCase from '@modules/area/useCases/ShowAreaUseCase';
import DeleteAreaUseCase from '@modules/area/useCases/DeleteAreaUseCase';
import UpdateAreaUseCase from '@modules/area/useCases/UpdateAreaUseCase';

export default class AreaController {
  public async index(request: Request, response: Response): Promise<Response> {
    const property_id = request.params.property_id;

    const listAreas = container.resolve(ListAreaUseCase);
    const areas = await listAreas.execute(property_id);

    return response.status(StatusCodes.OK).json(areas);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      species,
      variety,
      driving_system,
      rookstock_type,
      cultivated_area,
      geographic_coordinates,
      implementation_date,
      number_rows,
      distance_between_rows,
      distance_between_plants,
      number_plants,
    } = request.body;
    const property_id = request.params.property_id;

    const createArea = container.resolve(CreateAreaUseCase);

    const area = await createArea.execute({
      name,
      property_id,
      species,
      variety,
      driving_system,
      rookstock_type,
      cultivated_area,
      geographic_coordinates,
      implementation_date,
      number_rows,
      distance_between_rows,
      distance_between_plants,
      number_plants,
    });

    return response.status(StatusCodes.CREATED).json(area);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const area_id = request.params.area_id;
    const property_id = request.params.property_id;
    const {
      name,
      species,
      variety,
      driving_system,
      rookstock_type,
      cultivated_area,
      geographic_coordinates,
      implementation_date,
      number_rows,
      distance_between_rows,
      distance_between_plants,
      number_plants,
    } = request.body;

    const updateArea = container.resolve(UpdateAreaUseCase);

    const area = await updateArea.execute({
      name,
      area_id,
      property_id,
      species,
      variety,
      driving_system,
      rookstock_type,
      cultivated_area,
      geographic_coordinates,
      implementation_date,
      number_rows,
      distance_between_rows,
      distance_between_plants,
      number_plants,
    });

    return response.status(StatusCodes.OK).json(area);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const property_id = request.params.property_id;
    const area_id = request.params.area_id;
    const showArea = container.resolve(ShowAreaUseCase);

    const area = await showArea.execute({ property_id, area_id });

    return response.status(StatusCodes.OK).json(area);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const property_id = request.params.property_id;
    const area_id = request.params.area_id;

    const deleteArea = container.resolve(DeleteAreaUseCase);

    await deleteArea.execute({ property_id, area_id });

    return response.sendStatus(StatusCodes.NO_CONTENT);
  }
}
