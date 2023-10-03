import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';
import { ICropRepository } from '@modules/crops/domain/repositories/ICropRepository';
import Crop from '../entities/Crop';
import { ICrop } from '@modules/crops/domain/models/ICrop';
import { ICreateCrop } from '@modules/crops/domain/models/ICreateCrop';
import { IListCrop } from '@modules/crops/domain/models/IListCrop';

class CropRepository implements ICropRepository {
  private ormRepository: Repository<Crop>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Crop);
  }
  public async create({
    name,
    area_id,
    quantity,
    crop_date,
    crop_time,
  }: ICreateCrop): Promise<ICrop> {
    const crop = this.ormRepository.create({
      name,
      area_id,
      quantity,
      crop_date,
      crop_time,
    });

    await this.ormRepository.save(crop);

    return crop;
  }

  public async save(crop: ICrop): Promise<ICrop> {
    await this.ormRepository.save(crop);

    return crop;
  }

  public async remove(crop: Crop): Promise<void> {
    await this.ormRepository.remove(crop);
  }

  public async findAll(area_Id: string): Promise<IListCrop> {
    const areas = await this.ormRepository
      .createQueryBuilder('crops')
      .where('crops.area_id = :area_Id', { area_Id })
      .getMany();

    const result = {
      data: areas,
    };

    return result;
  }

  public async findByName(
    name: string,
    area_id: string,
  ): Promise<ICrop | null> {
    const crop = await this.ormRepository.findOne({
      where: {
        name,
        area_id,
      },
    });

    return crop;
  }

  public async findByIds(id: string, area_id: string): Promise<ICrop | null> {
    const crop = await this.ormRepository.findOne({
      where: {
        id,
        area_id,
      },
    });

    return crop;
  }
  public async findById(area_id: string): Promise<ICrop | null> {
    const crop = await this.ormRepository.findOneBy({
      area_id,
    });

    return crop;
  }
}

export default CropRepository;
