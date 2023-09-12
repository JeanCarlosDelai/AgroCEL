import CustomAPIError from '@shared/errors';
import { inject, injectable } from 'tsyringe';
import { IAreaRepository } from '../domain/repositories/IAreaRepository';
import { IUpdateArea } from '../domain/models/IUpdateArea';
import { IArea } from '../domain/models/IArea';

@injectable()
class UpdateAreaUseCase {
  constructor(
    @inject('AreaRepository')
    private areaRepository: IAreaRepository,
  ) {
    if (!areaRepository) {
      throw new Error('AreaRepository is required.');
    }
  }

  public async execute({
    name,
    property_id,
    area_id,
    species,
    variety,
    driving_system,
    rookstock_type,
    cultivated_area,
    geographic_coordinates,
    implementation_date,
    number_rows,
    distance_between_rows,
    distance_between_plants,
    number_plants,
  }: IUpdateArea): Promise<IArea> {
    const areaExists = await this.areaRepository.findByIds(
      property_id,
      area_id,
    );

    if (!areaExists) {
      throw new CustomAPIError.BadRequestError('Area not exist.');
    }

    areaExists.name = name;
    areaExists.species = species;
    areaExists.variety = variety;
    areaExists.driving_system = driving_system;
    areaExists.rookstock_type = rookstock_type;
    areaExists.cultivated_area = cultivated_area;
    areaExists.geographic_coordinates = geographic_coordinates;
    areaExists.implementation_date = implementation_date;
    areaExists.number_rows = number_rows;
    areaExists.distance_between_rows = distance_between_rows;
    areaExists.distance_between_plants = distance_between_plants;
    areaExists.number_plants = number_plants;

    const property = await this.areaRepository.save(areaExists);

    return property;
  }
}

export default UpdateAreaUseCase;
