import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';
import CropSale from '../entities/CropSale';
import { ICropSaleRepository } from '@modules/cropsSale/domain/repositories/ICropSaleRepository';
import { ICreateCropSale } from '@modules/cropsSale/domain/models/ICreateCropSale';
import { ICropSale } from '@modules/cropsSale/domain/models/ICropSale';
import { IListCropSale } from '@modules/cropsSale/domain/models/IListCropSale';

class CropSaleRepository implements ICropSaleRepository {
  private ormRepository: Repository<CropSale>;

  constructor() {
    this.ormRepository = dataSource.getRepository(CropSale);
  }
  public async create({
    name,
    area_id,
    crop_id,
    quantity,
    purchasing_entity,
    purchasing_entity_cnpj,
    graduation,
    price,
    discharge_date,
  }: ICreateCropSale): Promise<ICropSale> {
    const cropSale = this.ormRepository.create({
      name,
      area_id,
      crop_id,
      quantity,
      purchasing_entity,
      purchasing_entity_cnpj,
      graduation,
      price,
      discharge_date,
    });

    await this.ormRepository.save(cropSale);

    return cropSale;
  }

  public async save(cropDestination: ICropSale): Promise<ICropSale> {
    await this.ormRepository.save(cropDestination);

    return cropDestination;
  }

  public async remove(cropDestination: CropSale): Promise<void> {
    await this.ormRepository.remove(cropDestination);
  }

  public async findAll(crop_Id: string): Promise<IListCropSale> {
    const cropSale = await this.ormRepository
      .createQueryBuilder('crops_sale')
      .where('crops_sale.crop_id = :crop_Id', { crop_Id })
      .getMany();

    const result = {
      data: cropSale,
    };

    return result;
  }

  public async findByName(
    name: string,
    crop_id: string,
  ): Promise<ICropSale | null> {
    const cropSale = await this.ormRepository.findOne({
      where: {
        name,
        crop_id,
      },
    });

    return cropSale;
  }

  public async findByIds(
    id: string,
    crop_id: string,
  ): Promise<ICropSale | null> {
    const cropSale = await this.ormRepository.findOne({
      where: {
        id,
        crop_id,
      },
    });

    return cropSale;
  }
  public async findById(crop_id: string): Promise<ICropSale | null> {
    const cropSale = await this.ormRepository.findOneBy({
      crop_id,
    });

    return cropSale;
  }
}

export default CropSaleRepository;
