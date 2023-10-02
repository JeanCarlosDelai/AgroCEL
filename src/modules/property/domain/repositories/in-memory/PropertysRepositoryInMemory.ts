import { v4 as uuidv4 } from 'uuid';
import Property from '@modules/property/infra/typeorm/entities/Property';
import { ICreateProperty } from '../../models/ICreateProperty';
import { IPropertyRepository } from '../IPropertyRepository';
import { IPropertyAllOfUser } from '../../models/IPropertyAllOfUser';

class PropertysRepositoryInMemory implements IPropertyRepository {
  private propertys: Property[] = [];

  public async create({
    name,
    user_id,
    total_area,
    cultivated_area,
    city,
    state,
  }: ICreateProperty): Promise<Property> {
    const property = new Property();

    property.id = uuidv4();
    property.user_id = user_id;
    property.name = name;
    property.total_area = total_area;
    property.cultivated_area = cultivated_area;
    property.city = city;
    property.state = state;

    this.propertys.push(property);

    return property;
  }

  public async save(property: Property): Promise<Property> {
    const findIndex = this.propertys.findIndex(
      (findProperty) => findProperty.id === property.id,
    );

    this.propertys[findIndex] = property;

    return property;
  }

  public async remove(property: Property): Promise<void> {
    const propertyIndex = this.propertys.findIndex(
      (findProperty) => findProperty.id === property.id,
    );

    this.propertys.splice(propertyIndex, 1);
  }

  public async findAllOfUser(user_id: string): Promise<IPropertyAllOfUser> {
    const properties: Property[] = this.propertys.filter(
      (property) => property.user_id === user_id,
    );

    return { data: properties };
  }

  public async findByName(name: string): Promise<Property | null> {
    const property = this.propertys.find((property) => property.name === name);
    if (property) {
      return property;
    } else return null;
  }

  public async findById(id: string): Promise<Property | null> {
    const property = this.propertys.find((property) => property.id === id);
    if (property) {
      return property;
    } else return null;
  }

  public async findByIds(
    user_id: string,
    id: string,
  ): Promise<Property | null> {
    const property = this.propertys.find(
      (property) => property.user_id === user_id && property.id === id,
    );
    if (property) {
      return property;
    } else return null;
  }
}

export default PropertysRepositoryInMemory;
