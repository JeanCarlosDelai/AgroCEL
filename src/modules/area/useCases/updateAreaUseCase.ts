import CustomAPIError from '@shared/errors';
import { inject, injectable } from 'tsyringe';
import { IAreaRepository } from '../domain/repositories/IAreaRepository';
import { IUpdateArea } from '../domain/models/IUpdateArea';
import { IArea } from '../domain/models/IArea';
import { IPropertyRepository } from '@modules/property/domain/repositories/IPropertyRepository';

@injectable()
class UpdateAreaUseCase {
  constructor(
    @inject('AreaRepository')
    private areaRepository: IAreaRepository,
    @inject('PropertyRepository')
    private propertyRepository: IPropertyRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute({
    name,
    area_id,
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
  }: IUpdateArea): Promise<IArea> {
    const areaExists = await this.areaRepository.findByIds(
      property_id,
      area_id,
    );

    const propertyOld = await this.propertyRepository.findById(property_id,);

    if (propertyOld) {

      if (!areaExists) {
        throw new CustomAPIError.BadRequestError('Propriedade ou área não existe.');
      }

      if (areaExists.cultivated_area < cultivated_area) {
        if (propertyOld.total_area < (propertyOld.cultivated_area + cultivated_area - areaExists.cultivated_area)) {
          throw new CustomAPIError.BadRequestError('Área cultivada maior que área total da propriedade.');
        } else {
          propertyOld.cultivated_area += cultivated_area - areaExists.cultivated_area;
          await this.propertyRepository.save(propertyOld);
        }

      } else if (areaExists.cultivated_area > cultivated_area) {

        propertyOld.cultivated_area += cultivated_area - areaExists.cultivated_area;
        await this.propertyRepository.save(propertyOld);
      }

    } else {
      throw new CustomAPIError.BadRequestError('Propriedade não encontrada.');
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

    const area = await this.areaRepository.save(areaExists);

    return area;
  }
}

export default UpdateAreaUseCase;
