import CustomAPIError from '@shared/errors';
import { inject, injectable } from 'tsyringe';
import { IReportRepository } from '../domain/repositories/IReportRepository';
import { ICreateArea } from '../domain/models/ICreateArea';
import { IArea } from '../domain/models/IReports';
import { IPropertyRepository } from '@modules/property/domain/repositories/IPropertyRepository';

@injectable()
class CreateAreaUseCase {
  constructor(
    @inject('AreaRepository')
    private areaRepository: IReportRepository,
    @inject('PropertyRepository')
    private propertyRepository: IPropertyRepository, // eslint-disable-next-line prettier/prettier
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

    const propertyOld = await this.propertyRepository.findById(property_id,);

    if (propertyOld) {
      if (propertyOld.total_area < propertyOld.cultivated_area + cultivated_area) {
        throw new CustomAPIError.BadRequestError('Área cultivada maior que área total da propriedade.');
      } else {
        propertyOld.cultivated_area += cultivated_area;
        await this.propertyRepository.save(propertyOld);

      }
    } else {
      throw new CustomAPIError.BadRequestError('Propriedade não encontrada.');
    }

    const areaExists = await this.areaRepository.findByName(name, property_id);

    if (areaExists) {
      throw new CustomAPIError.BadRequestError('Nome da Área já está sendo Usado.');
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
