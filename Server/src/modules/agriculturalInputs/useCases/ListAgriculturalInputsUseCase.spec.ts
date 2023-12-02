import 'reflect-metadata';
import CreateAgriculturalInputsUseCase from './CreateAgriculturalInputsUseCase';
import AgriculturalInputsRepositoryInMemory from '../domain/repositories/in-memory/AgriculturalInputsRepositoryInMemory';
import { ICreateAgriculturalInputs } from '../domain/models/ICreateAgriculturalInputs';
import ListAgriculturalInputsUseCase from './ListAgriculturalInputsUseCase';

const agriculturalInputsRepositoryInMemory =
  new AgriculturalInputsRepositoryInMemory();

const createAgriculturalInputsUseCase = new CreateAgriculturalInputsUseCase(
  agriculturalInputsRepositoryInMemory,
);

const listAgriculturalInputsUseCase = new ListAgriculturalInputsUseCase(
  agriculturalInputsRepositoryInMemory,
);

describe('List Agricultural Input', () => {
  it('Should be able to list a new agricultural Input', async () => {
    const agriculturalInputsData: ICreateAgriculturalInputs = {
      name: 'Sulfato',
      type: 'Veneno',
      benefit: 'Anti-pragas',
      description: 'Usado a cada 15 dias',
    };
    await createAgriculturalInputsUseCase.execute(agriculturalInputsData);

    const agriculturalInputsList =
      await listAgriculturalInputsUseCase.execute();

    expect(agriculturalInputsList.data[0].name).toBe(
      agriculturalInputsData.name,
    );
  });
});
