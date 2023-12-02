import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';
import { IAgriculturalInputsRepository } from '@modules/agriculturalInputs/domain/repositories/IAgriculturalInputsRepository';
import AgriculturalInputs from '../entities/AgriculturalInputs';
import { IAgriculturalInputs } from '@modules/application/domain/models/IAgriculturalInputs';
import { ICreateAgriculturalInputs } from '@modules/agriculturalInputs/domain/models/ICreateAgriculturalInputs';
import { IListAgriculturalInputs } from '@modules/agriculturalInputs/domain/models/IListAgriculturalInputs';

class AgriculturalInputsRepository implements IAgriculturalInputsRepository {
  private ormRepository: Repository<AgriculturalInputs>;

  constructor() {
    this.ormRepository = dataSource.getRepository(AgriculturalInputs);
  }
  public async create({
    name,
    type,
    benefit,
    description,
  }: ICreateAgriculturalInputs): Promise<IAgriculturalInputs> {
    const agriculturalInputs = this.ormRepository.create({
      name,
      type,
      benefit,
      description,
    });

    await this.ormRepository.save(agriculturalInputs);

    return agriculturalInputs;
  }

  public async save(
    agriculturalInputs: IAgriculturalInputs,
  ): Promise<IAgriculturalInputs> {
    await this.ormRepository.save(agriculturalInputs);

    return agriculturalInputs;
  }

  public async remove(application: AgriculturalInputs): Promise<void> {
    await this.ormRepository.remove(application);
  }

  public async findAll(): Promise<IListAgriculturalInputs> {
    const agriculturalInputs = await this.ormRepository
      .createQueryBuilder('agriculturalInputs')
      .getMany();

    const result = {
      data: agriculturalInputs,
    };

    return result;
  }

  public async findById(id: string): Promise<IAgriculturalInputs | null> {
    const agriculturalInputs = await this.ormRepository.findOneBy({
      id,
    });

    return agriculturalInputs;
  }
}

export default AgriculturalInputsRepository;
