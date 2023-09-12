import CustomAPIError from '@shared/errors';
import { inject, injectable } from 'tsyringe';
import { IPropertyRepository } from '../domain/repositories/IPropertyRepository';
import { IUpdateProperty } from '../domain/models/IUpdateProperty';
import { IProperty } from '../domain/models/IProperty';

@injectable()
class UpdatePropertyUseCase {
  constructor(
    @inject('PropertyRepository')
    private propertyRepository: IPropertyRepository,
  ) {
    if (!propertyRepository) {
      throw new Error('PropertyRepository is required.');
    }
  }

  public async execute({
    name,
    user_id,
    property_id,
    total_area,
    cultivated_area,
    city,
    state,
  }: IUpdateProperty): Promise<IProperty> {
    const propertyExists = await this.propertyRepository.findByIds(
      user_id,
      property_id,
    );

    if (!propertyExists) {
      throw new CustomAPIError.BadRequestError('Property not exist.');
    }

    propertyExists.name = name;
    propertyExists.total_area = total_area;
    propertyExists.cultivated_area = cultivated_area;
    propertyExists.city = city;
    propertyExists.state = state;

    const property = await this.propertyRepository.save(propertyExists);

    return property;
  }
}

export default UpdatePropertyUseCase;
