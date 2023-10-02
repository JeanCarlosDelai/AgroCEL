import { inject, injectable } from 'tsyringe';
import { IPropertyRepository } from '../domain/repositories/IPropertyRepository';
import { IPropertyAllOfUser } from '../domain/models/IPropertyAllOfUser';

@injectable()
class ListPropertyUseCase {
  constructor(
    @inject('PropertyRepository')
    private propertysRepository: IPropertyRepository, // eslint-disable-next-line prettier/prettier
  ) // eslint-disable-next-line prettier/prettier
  { }

  public async execute(user_Id: string): Promise<IPropertyAllOfUser> {
    const propertys = await this.propertysRepository.findAllOfUser(user_Id);

    return propertys;
  }
}

export default ListPropertyUseCase;
