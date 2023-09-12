import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileUseCase from '@modules/user/useCases/UpdateProfileUseCase';
import { instanceToInstance } from 'class-transformer';
import ShowUserUseCase from '@modules/user/useCases/ShowUserUseCase';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = container.resolve(ShowUserUseCase);
    const user_id = request.user.id;

    const user = await showProfile.execute({ user_id });

    return response.json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;

    const updateProfile = container.resolve(UpdateProfileUseCase);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(instanceToInstance(user));
  }
}
