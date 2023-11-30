import { inject, injectable } from 'tsyringe';
import { ICropRepository } from '@modules/crops/domain/repositories/ICropRepository';
import { ICropSaleRepository } from '../domain/repositories/ICropSaleRepository';
import { IListCropSale } from '../domain/models/IListCropSale';
@injectable()
class ListCropSaleUseCase {
  constructor(
    @inject('CropRepository')
    private cropsRepository: ICropRepository,
    @inject('CropSaleRepository')
    private cropSaleRepository: ICropSaleRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute(area_id: string): Promise<IListCropSale> {
    const cropSale = await this.cropSaleRepository.findAll(area_id);

    return cropSale;
  }
}

export default ListCropSaleUseCase;
