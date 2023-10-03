import { v4 as uuidv4 } from 'uuid';
import { ICropDestinationRepository } from '../ICropDestinationRepository';
import CropDestination from '@modules/cropsDestination/infra/typeorm/entities/CropDestination';
import { ICreateCropDestination } from '../../models/ICreateCropDestination';
import { IListCropDestination } from '../../models/IListCropDestination';
// import { ICropRepository } from '../ICropDestinationRepository';
// import Crop from '@modules/crops/infra/typeorm/entities/Crop';
// import { ICreateCrop } from '../../models/ICreateCropDestination';
// import { IListCrop } from '../../models/IListCropDestination';

class CropDestinationRepositoryInMemory implements ICropDestinationRepository {
  private cropsDestination: CropDestination[] = [];

  public async create({
    name,
    area_id,
    crop_id,
    quantity,
    destination,
    processing_type,
  }: ICreateCropDestination): Promise<CropDestination> {
    const area = new CropDestination();

    area.id = uuidv4();
    area.name = name;
    area.area_id = area_id;
    area.crop_id = crop_id;
    area.quantity = quantity;
    area.destination = destination;
    area.processing_type = processing_type;

    this.cropsDestination.push(area);

    return area;
  }

  public async save(
    cropDestination: CropDestination,
  ): Promise<CropDestination> {
    const findIndex = this.cropsDestination.findIndex(
      (findCropDestination) => findCropDestination.id === cropDestination.id,
    );

    this.cropsDestination[findIndex] = cropDestination;

    return cropDestination;
  }

  public async remove(cropDestination: CropDestination): Promise<void> {
    const cropDestinationIndex = this.cropsDestination.findIndex(
      (findCrop) => findCrop.id === cropDestination.id,
    );

    this.cropsDestination.splice(cropDestinationIndex, 1);
  }

  public async findAll(crop_id: string): Promise<IListCropDestination> {
    const cropsDestination: CropDestination[] = this.cropsDestination.filter(
      (crop) => crop.id === crop_id,
    );

    return { data: cropsDestination };
  }

  public async findByName(
    name: string,
    crop_id: string,
  ): Promise<CropDestination | null> {
    const cropDestination = this.cropsDestination.find(
      (cropDestination) =>
        cropDestination.name === name && cropDestination.crop_id === crop_id,
    );
    if (cropDestination) {
      return cropDestination;
    } else return null;
  }

  public async findById(id: string): Promise<CropDestination | null> {
    const cropDestination = this.cropsDestination.find(
      (cropDestination) => cropDestination.id === id,
    );
    if (cropDestination) {
      return cropDestination;
    } else return null;
  }

  public async findByIds(
    id: string,
    crop_id: string,
  ): Promise<CropDestination | null> {
    const cropDestination = this.cropsDestination.find(
      (Destination) => Destination.id === id && Destination.crop_id === crop_id,
    );
    if (cropDestination) {
      return cropDestination;
    } else return null;
  }
}

export default CropDestinationRepositoryInMemory;
