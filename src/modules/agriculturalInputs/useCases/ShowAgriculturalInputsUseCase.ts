import { inject, injectable } from 'tsyringe';
import CustomAPIError from '@shared/errors';
import 'reflect-metadata';
import { IAgriculturalInputs } from '../domain/models/IAgriculturalInputs';
import { IShowAgriculturalInputs } from '../domain/models/IShowAgriculturalInputs';
import { IAgriculturalInputsRepository } from '../domain/repositories/IAgriculturalInputsRepository';

@injectable()
class ShowAgriculturalInputsUseCase {
  constructor(
    @inject('AgriculturalInputsRepository')
    private agriculturalInputsRepository: IAgriculturalInputsRepository, // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line prettier/prettier
  ) {}

  public async execute({
    id,
  }: IShowAgriculturalInputs): Promise<IAgriculturalInputs | null> {
    const AgriculturalInputs =
      await this.agriculturalInputsRepository.findById(id);
    if (!AgriculturalInputs) {
      throw new CustomAPIError.BadRequestError('AgriculturalInputs not exist.');
    }

    return AgriculturalInputs;
  }
}

export default ShowAgriculturalInputsUseCase;
