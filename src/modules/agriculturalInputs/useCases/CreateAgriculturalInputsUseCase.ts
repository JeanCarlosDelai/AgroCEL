import { inject, injectable } from 'tsyringe';
import { IAgriculturalInputsRepository } from '../domain/repositories/IAgriculturalInputsRepository';
import { IAgriculturalInputs } from '../domain/models/IAgriculturalInputs';
import { ICreateAgriculturalInputs } from '../domain/models/ICreateAgriculturalInputs';

@injectable()
class CreateAgriculturalInputsUseCase {
  constructor(
    @inject('AgriculturalInputsRepository')
    private agriculturalInputsRepository: IAgriculturalInputsRepository, // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line prettier/prettier
  ) {}

  public async execute({
    name,
    type,
    benefit,
    description,
  }: ICreateAgriculturalInputs): Promise<IAgriculturalInputs> {
    const agriculturalInputs = await this.agriculturalInputsRepository.create({
      name,
      type,
      benefit,
      description,
    });

    return agriculturalInputs;
  }
}

export default CreateAgriculturalInputsUseCase;
