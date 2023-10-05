import 'reflect-metadata';
import CreateAgriculturalInputsUseCase from './CreateAgriculturalInputsUseCase';
import AgriculturalInputsRepositoryInMemory from '../domain/repositories/in-memory/AgriculturalInputsRepositoryInMemory';
import { ICreateAgriculturalInputs } from '../domain/models/ICreateAgriculturalInputs';

const agriculturalInputsRepositoryInMemory =
  new AgriculturalInputsRepositoryInMemory();

const createAgriculturalInputsUseCase = new CreateAgriculturalInputsUseCase(
  agriculturalInputsRepositoryInMemory,
);

describe('Create Agricultural Input', () => {
  it('Should be able to create a new agricultural Input', async () => {
    const agriculturalInputsData: ICreateAgriculturalInputs = {
      name: 'Sulfato',
      type: 'Veneno',
      benefit: 'Anti-pragas',
      description: 'Usado a cada 15 dias',
    };
    const agriculturalInputs = await createAgriculturalInputsUseCase.execute(
      agriculturalInputsData,
    );

    expect(agriculturalInputs).toHaveProperty('id');
    expect(agriculturalInputs.name).toBe(agriculturalInputsData.name);
  });
});
