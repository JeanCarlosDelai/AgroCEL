import { inject, injectable } from 'tsyringe';
import { IPropertyRepository } from '../domain/repositories/IPropertyRepository';
import { IDeleteProperty } from '../domain/models/IDeleteProperty';
import CustomAPIError from '@shared/errors';

@injectable()
class DeletePropertyUseCase {
  constructor(
    @inject('PropertyRepository')
    private propertyRepository: IPropertyRepository,
  ) {
    if (!propertyRepository) {
      throw new Error('PropertyRepository is required.');
    }
  }

  public async execute({ id }: IDeleteProperty): Promise<void> {
    const product = await this.propertyRepository.findById(id);

    if (!product) {
      throw new CustomAPIError.BadRequestError('Product not found.');
    }

    await this.propertyRepository.remove(product);
  }
}

export default DeletePropertyUseCase;
