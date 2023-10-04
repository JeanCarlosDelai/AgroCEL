import CreateCropDestinationUseCase from '@modules/cropsDestination/useCases/CreateCropDestinationUseCase';
import DeleteCropDestinationUseCase from '@modules/cropsDestination/useCases/DeleteCropDestinationUseCase';
import ListCropDestinationUseCase from '@modules/cropsDestination/useCases/ListCropDestinationUseCase';
import ShowCropDestinationUseCase from '@modules/cropsDestination/useCases/ShowCropDestinationUseCase';
import UpdateCropDestinationUseCase from '@modules/cropsDestination/useCases/UpdateCropDestinationUseCase';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';

export default class CropDestinationController {
  public async index(request: Request, response: Response): Promise<Response> {
    const crop_id = request.params.crop_id;

    const listCropsDestination = container.resolve(ListCropDestinationUseCase);
    const cropsDestination = await listCropsDestination.execute(crop_id);

    return response.status(StatusCodes.OK).json(cropsDestination);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, quantity, destination, processing_type } = request.body;
    const crop_id = request.params.crop_id;
    const area_id = request.params.area_id;

    const createCropDestination = container.resolve(
      CreateCropDestinationUseCase,
    );

    const cropDestination = await createCropDestination.execute({
      name,
      crop_id,
      area_id,
      quantity,
      destination,
      processing_type,
    });

    return response.status(StatusCodes.CREATED).json(cropDestination);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const area_id = request.params.area_id;
    const crop_id = request.params.crop_id;
    const id = request.params.crop_destination_id;
    const { name, quantity, destination, processing_type } = request.body;

    const updateCropDestination = container.resolve(
      UpdateCropDestinationUseCase,
    );

    const cropDestination = await updateCropDestination.execute({
      name,
      id,
      area_id,
      crop_id,
      quantity,
      destination,
      processing_type,
    });

    return response.status(StatusCodes.OK).json(cropDestination);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params.crop_destination_id;
    const crop_id = request.params.crop_id;
    const showCrop = container.resolve(ShowCropDestinationUseCase);

    const cropDestination = await showCrop.execute({ id, crop_id });

    return response.status(StatusCodes.OK).json(cropDestination);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params.crop_destination_id;
    const crop_id = request.params.crop_id;

    const deleteCropDestination = container.resolve(
      DeleteCropDestinationUseCase,
    );

    await deleteCropDestination.execute({ id, crop_id });

    return response.sendStatus(StatusCodes.NO_CONTENT);
  }
}
