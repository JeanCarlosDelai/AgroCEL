import { v4 as uuidv4 } from 'uuid';
import { ICropRepository } from '../ICropRepository';
import Crop from '@modules/crops/infra/typeorm/entities/Crop';
import { ICreateCrop } from '../../models/ICreateCrop';
import { IListCrop } from '../../models/IListCrop';

class CropRepositoryInMemory implements ICropRepository {
  private crops: Crop[] = [];

  public async create({
    name,
    area_id,
    quantity,
    crop_date,
    crop_time,
  }: ICreateCrop): Promise<Crop> {
    const area = new Crop();

    area.id = uuidv4();
    area.name = name;
    area.area_id = area_id;
    area.quantity = quantity;
    area.crop_date = crop_date;
    area.crop_time = crop_time;

    this.crops.push(area);

    return area;
  }

  public async save(crop: Crop): Promise<Crop> {
    const findIndex = this.crops.findIndex(
      (findCrop) => findCrop.id === crop.id,
    );

    this.crops[findIndex] = crop;

    return crop;
  }

  public async remove(crop: Crop): Promise<void> {
    const cropIndex = this.crops.findIndex(
      (findCrop) => findCrop.id === crop.id,
    );

    this.crops.splice(cropIndex, 1);
  }

  public async findAll(area_id: string): Promise<IListCrop> {
    const crops: Crop[] = this.crops.filter((area) => area.area_id === area_id);

    return { data: crops };
  }

  public async findByName(name: string, area_id: string): Promise<Crop | null> {
    const crop = this.crops.find(
      (crop) => crop.name === name && crop.area_id === area_id,
    );
    if (crop) {
      return crop;
    } else return null;
  }

  public async findById(id: string): Promise<Crop | null> {
    const crop = this.crops.find((crop) => crop.id === id);
    if (crop) {
      return crop;
    } else return null;
  }

  public async findByIds(
    area_id: string,
    crop_id: string,
  ): Promise<Crop | null> {
    const crop = this.crops.find(
      (crop) => crop.id === area_id && crop.id === crop_id,
    );
    if (crop) {
      return crop;
    } else return null;
  }
}

export default CropRepositoryInMemory;
