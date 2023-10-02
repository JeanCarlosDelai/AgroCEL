import CustomAPIError from '@shared/errors';
import { inject, injectable } from 'tsyringe';
import { IAreaRepository } from '../domain/repositories/IAreaRepository';
import { ICreateArea } from '../domain/models/ICreateArea';
import { IArea } from '../domain/models/IArea';

@injectable()
class CreateAreaUseCase {
  constructor(
    @inject('AreaRepository')
    private areaRepository: IAreaRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute({
    name,
    property_id,
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
  }: ICreateArea): Promise<IArea> {
    const areaExists = await this.areaRepository.findByName(name, property_id);

    if (areaExists) {
      throw new CustomAPIError.BadRequestError('Area name already used.');
    }

    const area = await this.areaRepository.create({
      name,
      property_id,
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
    });

    return area;
  }
}

export default CreateAreaUseCase;
