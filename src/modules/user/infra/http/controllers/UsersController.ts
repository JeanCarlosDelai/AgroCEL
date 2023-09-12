import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserUseCase from '@modules/user/useCases/CreateUserUseCase';
import ListUserUseCase from '@modules/user/useCases/ListUserUseCase';
import ShowUserUseCase from '@modules/user/useCases/ShowUserUseCase';
import { instanceToInstance } from 'class-transformer';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;
    const listUser = container.resolve(ListUserUseCase);

    const users = await listUser.execute({ page, limit });

    return response.json(instanceToInstance(users));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.id;
    const showUser = container.resolve(ShowUserUseCase);

    const user = await showUser.execute({ user_id });

    return response.json(instanceToInstance(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserUseCase);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }
}
