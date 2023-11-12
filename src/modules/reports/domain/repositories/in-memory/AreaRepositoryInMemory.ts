import Area from '@modules/area/infra/typeorm/entities/Area';
import { v4 as uuidv4 } from 'uuid';
import { IReportRepository } from '../IReportRepository';
import { ICreateArea } from '../../models/ICreateArea';
import { IListReports } from '../../models/IListReports';

class AreaRepositoryInMemory implements IReportRepository {
  private areas: Area[] = [];

  public async create({
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
  }: ICreateArea): Promise<Area> {
    const area = new Area();

    area.id = uuidv4();
    area.name = name;
    area.property_id = property_id;
    area.species = species;
    area.variety = variety;
    area.driving_system = driving_system;
    area.rookstock_type = rookstock_type;
    area.cultivated_area = cultivated_area;
    area.geographic_coordinates = geographic_coordinates;
    area.implementation_date = implementation_date;
    area.number_rows = number_rows;
    area.distance_between_rows = distance_between_rows;
    area.distance_between_plants = distance_between_plants;
    area.number_plants = number_plants;

    this.areas.push(area);

    return area;
  }

  public async save(area: Area): Promise<Area> {
    const findIndex = this.areas.findIndex(
      (findArea) => findArea.id === area.id,
    );

    this.areas[findIndex] = area;

    return area;
  }

  public async remove(area: Area): Promise<void> {
    const propertyIndex = this.areas.findIndex(
      (findArea) => findArea.id === area.id,
    );

    this.areas.splice(propertyIndex, 1);
  }

  public async findAll(user_id: string): Promise<IListReports> {
    const areas: Area[] = this.areas.filter(
      (area) => area.property_id === user_id,
    );

    return { data: areas };
  }

  public async findByName(
    name: string,
    property_id: string,
  ): Promise<Area | null> {
    const area = this.areas.find(
      (area) => area.name === name && area.property_id === property_id,
    );
    if (area) {
      return area;
    } else return null;
  }

  public async findById(id: string): Promise<Area | null> {
    const area = this.areas.find((area) => area.id === id);
    if (area) {
      return area;
    } else return null;
  }

  public async findByIds(
    property_id: string,
    area_id: string,
  ): Promise<Area | null> {
    const area = this.areas.find(
      (area) => area.id === area_id && area.property_id === property_id,
    );
    if (area) {
      return area;
    } else return null;
  }
}

export default AreaRepositoryInMemory;
