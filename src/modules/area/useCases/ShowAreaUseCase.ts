import { inject, injectable } from 'tsyringe';
import { IAreaRepository } from '../domain/repositories/IAreaRepository';
import CustomAPIError from '@shared/errors';
import { IArea } from '../domain/models/IArea';
import { IShowArea } from '../domain/models/IShowArea';
import { IPropertyRepository } from '@modules/property/domain/repositories/IPropertyRepository';

@injectable()
class ShowAreaUseCase {
  constructor(
    @inject('AreaRepository')
    private areasRepository: IAreaRepository
  ) {
    if (!areasRepository) {
      throw new Error('AreaRepository is required.');
    }
  }

  public async execute({
    property_id,
    area_id,
  }: IShowArea): Promise<IArea | null> {
    const area = await this.areasRepository.findByIds(property_id, area_id);
    if (!area) {
      throw new CustomAPIError.BadRequestError('Property or Area not exist.');
    }

    return area;
  }
}

export default ShowAreaUseCase;
