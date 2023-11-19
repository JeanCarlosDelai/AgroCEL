import { inject, injectable } from 'tsyringe';
import { IAreaRepository } from '../domain/repositories/IAreaRepository';
import CustomAPIError from '@shared/errors';
import { IArea } from '../domain/models/IArea';
import { IShowArea } from '../domain/models/IShowArea';

@injectable()
class ShowAreaUseCase {
  constructor(
    @inject('AreaRepository')
    private areasRepository: IAreaRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute({
    property_id,
    area_id,
  }: IShowArea): Promise<IArea | null> {
    const area = await this.areasRepository.findByIds(property_id, area_id);
    if (!area) {
      throw new CustomAPIError.BadRequestError('Propriedade ou área não existe.');
    }

    return area;
  }
}

export default ShowAreaUseCase;
