import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSessionsUseCase from '@modules/users/useCases/CreateSessionsUseCase';
import { instanceToInstance } from 'class-transformer';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = container.resolve(CreateSessionsUseCase);

    const user = await createSession.execute({
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }
}
