import CustomAPIError from '@shared/errors';
import { inject, injectable } from 'tsyringe';
import { IReportRepository } from '../domain/repositories/IReportRepository';
import { IReports } from '../domain/models/IReports';
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
  }: any): Promise<any> {
    const propertyOld = await this.propertyRepository.findById(property_id);

    if (propertyOld) {
      if (
        propertyOld.total_area <
        propertyOld.cultivated_area + cultivated_area
      ) {
        throw new CustomAPIError.BadRequestError(
          'Área cultivada maior que área total da propriedade.',
        );
      } else {
        propertyOld.cultivated_area += cultivated_area;
        await this.propertyRepository.save(propertyOld);
      }
    } else {
      throw new CustomAPIError.BadRequestError('Propriedade não encontrada.');
    }


  }
}

export default CreateAreaUseCase;
