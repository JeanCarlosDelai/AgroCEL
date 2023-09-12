import { inject, injectable } from 'tsyringe';
import { IAreaRepository } from '../domain/repositories/IAreaRepository';
import { IListArea } from '../domain/models/IListArea';
import CustomAPIError from '@shared/errors';

@injectable()
class ListAreaUseCase {
  constructor(
    @inject('AreaRepository')
    private areasRepository: IAreaRepository,
  ) {
    if (!areasRepository) {
      throw new Error('PropertyRepository is required.');
    }
  }

  public async execute(property_Id: string): Promise<IListArea> {
    const area = await this.areasRepository.findById(property_Id);

    if (!area) {
      throw new CustomAPIError.BadRequestError('Property does not exists.');
    }

    const areas = await this.areasRepository.findAll(property_Id);

    return areas;
  }
}

export default ListAreaUseCase;
