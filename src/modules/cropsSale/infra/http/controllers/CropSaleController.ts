import CreateCropSaleUseCase from '@modules/cropsSale/useCases/CreateCropSaleUseCase';
import DeleteCropSaleUseCase from '@modules/cropsSale/useCases/DeleteCropSaleUseCase';
import ListCropSaleUseCase from '@modules/cropsSale/useCases/ListCropSaleUseCase';
import ShowCropSaleUseCase from '@modules/cropsSale/useCases/ShowCropSaleUseCase';
import UpdateCropSaleUseCase from '@modules/cropsSale/useCases/UpdateCropSaleUseCase';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';

export default class CropSaleController {
  public async index(request: Request, response: Response): Promise<Response> {
    const crop_id = request.params.crop_id;

    const listCropsSale = container.resolve(ListCropSaleUseCase);
    const cropsSale = await listCropsSale.execute(crop_id);

    return response.status(StatusCodes.OK).json(cropsSale);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      quantity,
      purchasing_entity,
      purchasing_entity_cnpj,
      graduation,
      price,
      discharge_date,
    } = request.body;
    const crop_id = request.params.crop_id;
    const area_id = request.params.area_id;

    const createCropSale = container.resolve(CreateCropSaleUseCase);

    const cropDestination = await createCropSale.execute({
      name,
      area_id,
      crop_id,
      quantity,
      purchasing_entity,
      purchasing_entity_cnpj,
      graduation,
      price,
      discharge_date,
    });

    return response.status(StatusCodes.CREATED).json(cropDestination);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const area_id = request.params.area_id;
    const crop_id = request.params.crop_id;
    const id = request.params.crop_sale_id;
    const {
      name,
      quantity,
      purchasing_entity,
      purchasing_entity_cnpj,
      graduation,
      price,
      discharge_date,
    } = request.body;

    const updateCropSale = container.resolve(UpdateCropSaleUseCase);

    const cropSale = await updateCropSale.execute({
      id,
      name,
      area_id,
      crop_id,
      quantity,
      purchasing_entity,
      purchasing_entity_cnpj,
      graduation,
      price,
      discharge_date,
    });

    return response.status(StatusCodes.OK).json(cropSale);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params.crop_sale_id;
    const crop_id = request.params.crop_id;
    const showCropSale = container.resolve(ShowCropSaleUseCase);

    const cropSale = await showCropSale.execute({ id, crop_id });

    return response.status(StatusCodes.OK).json(cropSale);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params.crop_sale_id;
    const crop_id = request.params.crop_id;

    const deleteCropSale = container.resolve(DeleteCropSaleUseCase);

    await deleteCropSale.execute({ id, crop_id });

    return response.sendStatus(StatusCodes.NO_CONTENT);
  }
}
