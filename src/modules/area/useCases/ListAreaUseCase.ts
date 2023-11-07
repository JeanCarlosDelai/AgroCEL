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
    private propertyRepository: IPropertyRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute(property_Id: string): Promise<IListArea> {
    const propertyExist = await this.propertyRepository.findById(property_Id);

    if (!propertyExist) {
      throw new CustomAPIError.BadRequestError('Area não existe.');
    }

    const areas = await this.areasRepository.findAll(property_Id);

    return areas;
  }
}

export default ListAreaUseCase;
