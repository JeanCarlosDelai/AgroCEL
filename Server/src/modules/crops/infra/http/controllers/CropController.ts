import CreateCropUseCase from '@modules/crops/useCases/CreateCropUseCase';
import DeleteCropUseCase from '@modules/crops/useCases/DeleteCropUseCase';
import ListCropUseCase from '@modules/crops/useCases/ListCropUseCase';
import ShowCropUseCase from '@modules/crops/useCases/ShowCropUseCase';
import UpdateCropUseCase from '@modules/crops/useCases/UpdateCropUseCase';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';

export default class CropController {
  public async index(request: Request, response: Response): Promise<Response> {
    const area_id = request.params.area_id;

    const listCrops = container.resolve(ListCropUseCase);
    const crops = await listCrops.execute(area_id);

    return response.status(StatusCodes.OK).json(crops);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, quantity, crop_date, crop_time } = request.body;
    const area_id = request.params.area_id;

    const createCrop = container.resolve(CreateCropUseCase);

    const crop = await createCrop.execute({
      name,
      area_id,
      quantity,
      crop_date,
      crop_time,
    });

    return response.status(StatusCodes.CREATED).json(crop);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const area_id = request.params.area_id;
    const id = request.params.crop_id;
    const { name, quantity, crop_date, crop_time } = request.body;

    const updateCrop = container.resolve(UpdateCropUseCase);

    const crop = await updateCrop.execute({
      name,
      id,
      area_id,
      quantity,
      crop_date,
      crop_time,
    });

    return response.status(StatusCodes.OK).json(crop);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params.crop_id;
    const area_id = request.params.area_id;
    const showCrop = container.resolve(ShowCropUseCase);

    const crop = await showCrop.execute({ id, area_id });

    return response.status(StatusCodes.OK).json(crop);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params.crop_id;
    const area_id = request.params.area_id;

    const deleteArea = container.resolve(DeleteCropUseCase);

    await deleteArea.execute({ id, area_id });

    return response.sendStatus(StatusCodes.NO_CONTENT);
  }
}
