import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';
import { ICropDestinationRepository } from '@modules/cropsDestination/domain/repositories/ICropDestinationRepository';
import CropDestination from '../entities/CropDestination';
import { ICreateCropDestination } from '@modules/cropsDestination/domain/models/ICreateCropDestination';
import { ICropDestination } from '@modules/cropsDestination/domain/models/ICropDestination';
import { IListCropDestination } from '@modules/cropsDestination/domain/models/IListCropDestination';

class CropDestinationRepository implements ICropDestinationRepository {
  private ormRepository: Repository<CropDestination>;

  constructor() {
    this.ormRepository = dataSource.getRepository(CropDestination);
  }
  public async create({
    name,
    area_id,
    crop_id,
    quantity,
    destination,
    processing_type,
  }: ICreateCropDestination): Promise<ICropDestination> {
    const cropDestination = this.ormRepository.create({
      name,
      area_id,
      crop_id,
      quantity,
      destination,
      processing_type,
    });

    await this.ormRepository.save(cropDestination);

    return cropDestination;
  }

  public async save(
    cropDestination: ICropDestination,
  ): Promise<ICropDestination> {
    await this.ormRepository.save(cropDestination);

    return cropDestination;
  }

  public async remove(cropDestination: CropDestination): Promise<void> {
    await this.ormRepository.remove(cropDestination);
  }

  public async findAll(crop_Id: string): Promise<IListCropDestination> {
    const cropsDestination = await this.ormRepository
      .createQueryBuilder('crops_destination')
      .where('crops_destination.crop_id = :crop_Id', { crop_Id })
      .getMany();

    const result = {
      data: cropsDestination,
    };

    return result;
  }

  public async findByName(
    name: string,
    crop_id: string,
  ): Promise<ICropDestination | null> {
    const cropDestination = await this.ormRepository.findOne({
      where: {
        name,
        crop_id,
      },
    });

    return cropDestination;
  }

  public async findByIds(
    id: string,
    crop_id: string,
  ): Promise<ICropDestination | null> {
    const crop = await this.ormRepository.findOne({
      where: {
        id,
        crop_id,
      },
    });

    return crop;
  }
  public async findById(crop_id: string): Promise<ICropDestination | null> {
    const crop = await this.ormRepository.findOneBy({
      crop_id,
    });

    return crop;
  }
}

export default CropDestinationRepository;
