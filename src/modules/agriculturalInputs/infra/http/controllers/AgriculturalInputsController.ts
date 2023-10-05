import CreateAgriculturalInputsUseCase from '@modules/agriculturalInputs/useCases/CreateAgriculturalInputsUseCase';
import ListAgriculturalInputsUseCase from '@modules/agriculturalInputs/useCases/ListAgriculturalInputsUseCase';
import ShowAgriculturalInputsUseCase from '@modules/agriculturalInputs/useCases/ShowAgriculturalInputsUseCase';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';

export default class AgriculturalIputsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAgriculturalIputs = container.resolve(
      ListAgriculturalInputsUseCase,
    );
    const agriculturalIputs = await listAgriculturalIputs.execute();

    return response.status(StatusCodes.OK).json(agriculturalIputs);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, type, benefit, description } = request.body;

    const createApplication = container.resolve(
      CreateAgriculturalInputsUseCase,
    );

    const application = await createApplication.execute({
      name,
      type,
      benefit,
      description,
    });

    return response.status(StatusCodes.CREATED).json(application);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const showAgriculturalIputs = container.resolve(
      ShowAgriculturalInputsUseCase,
    );

    const agriculturalIputs = await showAgriculturalIputs.execute({ id });

    return response.status(StatusCodes.OK).json(agriculturalIputs);
  }
}
