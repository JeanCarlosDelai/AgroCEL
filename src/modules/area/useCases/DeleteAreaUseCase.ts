import { inject, injectable } from 'tsyringe';
import CustomAPIError from '@shared/errors';
import { IAreaRepository } from '../domain/repositories/IAreaRepository';
import { IDeleteArea } from '../domain/models/IDeleteArea';

@injectable()
class DeleteAreaUseCase {
  constructor(
    @inject('AreaRepository')
    private areaRepository: IAreaRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute({ property_id, area_id }: IDeleteArea): Promise<void> {
    const area = await this.areaRepository.findByIds(property_id, area_id);

    if (!area) {
      throw new CustomAPIError.BadRequestError('Area not found.');
    }

    await this.areaRepository.remove(area);
  }
}

export default DeleteAreaUseCase;
