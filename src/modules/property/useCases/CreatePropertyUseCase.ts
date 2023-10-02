import CustomAPIError from '@shared/errors';
import { inject, injectable } from 'tsyringe';
import { ICreateProperty } from '../domain/models/ICreateProperty';
import { IProperty } from '../domain/models/IProperty';
import { IPropertyRepository } from '../domain/repositories/IPropertyRepository';

@injectable()
class CreatePropertyUseCase {
  constructor(
    @inject('PropertyRepository')
    private propertyRepository: IPropertyRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute({
    name,
    user_id,
    total_area,
    cultivated_area,
    city,
    state,
  }: ICreateProperty): Promise<IProperty> {
    const propertyExists = await this.propertyRepository.findByName(
      name,
      user_id,
    );

    if (propertyExists) {
      throw new CustomAPIError.BadRequestError('Property name already used.');
    }

    const property = await this.propertyRepository.create({
      name,
      user_id,
      total_area,
      cultivated_area,
      city,
      state,
    });

    return property;
  }
}

export default CreatePropertyUseCase;
