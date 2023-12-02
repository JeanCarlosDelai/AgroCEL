import { inject, injectable } from 'tsyringe';
import { IAgriculturalInputsRepository } from '../domain/repositories/IAgriculturalInputsRepository';
import { IListAgriculturalInputs } from '../domain/models/IListAgriculturalInputs';

@injectable()
class ListAgriculturalInputsUseCase {
  constructor(
    @inject('AgriculturalInputsRepository')
    private agriculturalInputsRepository: IAgriculturalInputsRepository, // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line prettier/prettier
  ) {}

  public async execute(): Promise<IListAgriculturalInputs> {
    const agriculturalInputs =
      await this.agriculturalInputsRepository.findAll();

    return agriculturalInputs;
  }
}

export default ListAgriculturalInputsUseCase;
