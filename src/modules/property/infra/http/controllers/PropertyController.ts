import CreatePropertyUseCase from '@modules/property/useCases/CreatePropertyUseCase';
import ListPropertyUseCase from '@modules/property/useCases/ListPropertyUseCase';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';
import DeletePropertyUseCase from '@modules/property/useCases/DeletePropertyUseCase';
import showPropertyUseCase from '@modules/property/useCases/ShowPropertyUseCase';
import UpdatePropertyUseCase from '@modules/property/useCases/updatePropertyUseCase';
import ReportUseCase from '@modules/property/useCases/ReportUseCase';

export default class PropertyController {
  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;

    const listPropertys = container.resolve(ListPropertyUseCase);
    const propertys = await listPropertys.execute(user_id);

    return response.status(StatusCodes.OK).json(propertys);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, total_area, cultivated_area, city, state } = request.body;
    const user_id = request.user.id;

    const createCustomer = container.resolve(CreatePropertyUseCase);

    const property = await createCustomer.execute({
      name,
      user_id,
      total_area,
      cultivated_area,
      city,
      state,
    });

    return response.status(StatusCodes.CREATED).json(property);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const property_id = request.params.id;
    const { name, total_area, cultivated_area, city, state } = request.body;
    const updateProperty = container.resolve(UpdatePropertyUseCase);

    const property = await updateProperty.execute({
      name,
      user_id,
      total_area,
      cultivated_area,
      city,
      state,
      property_id,
    });

    return response.json(property);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const property_id = request.params.id;

    const showProperty = container.resolve(showPropertyUseCase);

    const property = await showProperty.execute(user_id, property_id);

    return response.status(StatusCodes.OK).json(property);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProperty = container.resolve(DeletePropertyUseCase);

    await deleteProperty.execute({ id });

    return response.sendStatus(StatusCodes.NO_CONTENT);
  }

  public async reportAreas(request: Request, response: Response): Promise<Response> {
    const { property_id } = request.params;

    const report = container.resolve(ReportUseCase);

    const reports = await report.execute(property_id);

    return response.status(StatusCodes.OK).json(reports);
  }
}
