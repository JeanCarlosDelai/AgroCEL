import { inject, injectable } from 'tsyringe';
import { IPropertyRepository } from '../domain/repositories/IPropertyRepository';
import { IDeleteProperty } from '../domain/models/IDeleteProperty';
import CustomAPIError from '@shared/errors';

@injectable()
class DeletePropertyUseCase {
  constructor(
    @inject('PropertyRepository')
    private propertyRepository: IPropertyRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute({ id }: IDeleteProperty): Promise<void> {
    const product = await this.propertyRepository.findById(id);

    if (!product) {
      throw new CustomAPIError.BadRequestError('Property not found.');
    }

    await this.propertyRepository.remove(product);
  }
}

export default DeletePropertyUseCase;
