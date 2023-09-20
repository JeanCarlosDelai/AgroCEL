import { inject, injectable } from 'tsyringe';
import { IAreaRepository } from '../domain/repositories/IAreaRepository';
import { IListArea } from '../domain/models/IListArea';
import CustomAPIError from '@shared/errors';
import { IPropertyRepository } from '@modules/property/domain/repositories/IPropertyRepository';

@injectable()
class ListAreaUseCase {
  constructor(
    @inject('AreaRepository')
    private areasRepository: IAreaRepository,
    @inject('PropertyRepository')
    private propertyRepository: IPropertyRepository,
  ) {
    if (!areasRepository) {
      throw new Error('PropertyRepository is required.');
    }
  }

  public async execute(property_Id: string): Promise<IListArea> {
    const propertyExist = await this.propertyRepository.findById(property_Id);

    if (!propertyExist) {
      throw new CustomAPIError.BadRequestError('Property does not exists.');
    }

    const areas = await this.areasRepository.findAll(property_Id);

    return areas;
  }
}

export default ListAreaUseCase;
