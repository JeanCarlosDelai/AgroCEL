import { inject, injectable } from 'tsyringe';
import CustomAPIError from '@shared/errors';
import { IAreaRepository } from '../domain/repositories/IAreaRepository';
import { IDeleteArea } from '../domain/models/IDeleteArea';
import { IPropertyRepository } from '@modules/property/domain/repositories/IPropertyRepository';

@injectable()
class DeleteAreaUseCase {
  constructor(
    @inject('AreaRepository')
    private areaRepository: IAreaRepository,
    @inject('PropertyRepository')
    private propertyRepository: IPropertyRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute({ property_id, area_id }: IDeleteArea): Promise<void> {
    const area = await this.areaRepository.findByIds(property_id, area_id);

    if (!area) {
      throw new CustomAPIError.BadRequestError('Área não encontrada.');
    }

    await this.areaRepository.remove(area);

    const propertyOld = await this.propertyRepository.findById(property_id);

    if (propertyOld) {
      propertyOld.cultivated_area -= area.cultivated_area;
      await this.propertyRepository.save(propertyOld);
    } else {
      throw new CustomAPIError.BadRequestError('Propriedade não encontrada.');
    }
  }
}

export default DeleteAreaUseCase;
