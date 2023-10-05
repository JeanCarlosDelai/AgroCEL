import { v4 as uuidv4 } from 'uuid';
import { IListAgriculturalInputs } from '../../models/IListAgriculturalInputs';
import { ICreateAgriculturalInputs } from '../../models/ICreateAgriculturalInputs';
import { IAgriculturalInputsRepository } from '../IAgriculturalInputsRepository';
import AgriculturalInputs from '@modules/agriculturalInputs/infra/typeorm/entities/AgriculturalInputs';
// eslint-disable-next-line prettier/prettier
class AgriculturalInputsRepositoryInMemory implements IAgriculturalInputsRepository {
  private agriculturalInputs: AgriculturalInputs[] = [];

  public async create({
    name,
    type,
    benefit,
    description,
  }: ICreateAgriculturalInputs): Promise<AgriculturalInputs> {
    const agriculturalInputs = new AgriculturalInputs();

    agriculturalInputs.id = uuidv4();
    agriculturalInputs.name = name;
    agriculturalInputs.type = type;
    agriculturalInputs.benefit = benefit;
    agriculturalInputs.description = description;

    this.agriculturalInputs.push(agriculturalInputs);

    return agriculturalInputs;
  }

  public async save(
    agriculturalInputs: AgriculturalInputs,
  ): Promise<AgriculturalInputs> {
    const findIndex = this.agriculturalInputs.findIndex(
      (findagriculturalInputs) =>
        findagriculturalInputs.id === agriculturalInputs.id,
    );

    this.agriculturalInputs[findIndex] = agriculturalInputs;

    return agriculturalInputs;
  }

  public async findAll(): Promise<IListAgriculturalInputs> {
    const agriculturalInputs: AgriculturalInputs[] = this.agriculturalInputs;

    return { data: agriculturalInputs };
  }

  public async findById(id: string): Promise<AgriculturalInputs | null> {
    const agriculturalInputs = this.agriculturalInputs.find(
      (agriculturalInputs) => agriculturalInputs.id === id,
    );
    if (agriculturalInputs) {
      return agriculturalInputs;
    } else return null;
  }
}
export default AgriculturalInputsRepositoryInMemory;
