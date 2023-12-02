import 'reflect-metadata';
import CreateAgriculturalInputsUseCase from './CreateAgriculturalInputsUseCase';
import AgriculturalInputsRepositoryInMemory from '../domain/repositories/in-memory/AgriculturalInputsRepositoryInMemory';
import { ICreateAgriculturalInputs } from '../domain/models/ICreateAgriculturalInputs';
import ShowAgriculturalInputsUseCase from './ShowAgriculturalInputsUseCase';

const agriculturalInputsRepositoryInMemory =
  new AgriculturalInputsRepositoryInMemory();

const createAgriculturalInputsUseCase = new CreateAgriculturalInputsUseCase(
  agriculturalInputsRepositoryInMemory,
);

const showAgriculturalInputsUseCase = new ShowAgriculturalInputsUseCase(
  agriculturalInputsRepositoryInMemory,
);

describe('Show Agricultural Input', () => {
  it('Should be able to list a new agricultural Input', async () => {
    const agriculturalInputsData: ICreateAgriculturalInputs = {
      name: 'Sulfato',
      type: 'Veneno',
      benefit: 'Anti-pragas',
      description: 'Usado a cada 15 dias',
    };
    const agriculturalInput = await createAgriculturalInputsUseCase.execute(
      agriculturalInputsData,
    );

    const agriculturalInputsShow =
      await showAgriculturalInputsUseCase.execute(agriculturalInput);

    expect(agriculturalInputsShow).toHaveProperty('id');
  });

  it('Should be able to show a agricultural Input not exist', async () => {
    const id = '1232131321';
    const expectErrorResponse = new Error('AgriculturalInputs not exist.');

    expect(showAgriculturalInputsUseCase.execute({ id })).rejects.toThrowError(
      expectErrorResponse,
    );
  });
});
