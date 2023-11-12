import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';
import { IArea } from '@modules/area/domain/models/IArea';
import Area from '@modules/area/infra/typeorm/entities/Area';
import Property from '@modules/property/infra/typeorm/entities/Property';
import Crop from '@modules/crops/infra/typeorm/entities/Crop';
import Application from '@modules/application/infra/typeorm/entities/Application';
import OtherActivities from '@modules/otherActivities/infra/typeorm/entities/OtherActivities';
import { IProperty } from '@modules/property/domain/models/IProperty';
import { IReportsData } from '@modules/reports/domain/models/IReportsData';
import { IReportRepository } from '@modules/reports/domain/repositories/IReportRepository';

class ReportsRepository implements IReportRepository {
  private areaRepository: Repository<Area>;
  private propertyRepository: Repository<Property>;
  private cropRepository: Repository<Crop>;
  private applicationRepository: Repository<Application>;
  private otherActivitiesRepository: Repository<OtherActivities>;

  constructor() {
    this.areaRepository = dataSource.getRepository(Area);
    this.propertyRepository = dataSource.getRepository(Property);
    this.cropRepository = dataSource.getRepository(Crop);
    this.applicationRepository = dataSource.getRepository(Application);
    this.otherActivitiesRepository = dataSource.getRepository(OtherActivities);
  }

  public async findReport(property_id: string): Promise<IReportsData | null> {

    const property = await this.propertyRepository.findOneBy({
      id: property_id,
    });

    if (!property) {
      return null;
    }

    const areas = await this.areaRepository
      .createQueryBuilder('areas')
      .where('areas.property_id = :property_id', { property_id })
      .getMany();


    const areasWithCrops = await Promise.all(areas.map(async (area) => {
      const crops = await this.cropRepository
        .createQueryBuilder('crops')
        .where('crops.area_id = :area_id', { area_id: area.id })
        .getMany();

      const applications = await this.applicationRepository
        .createQueryBuilder('applications')
        .where('applications.area_id = :area_id', { area_id: area.id })
        .getMany();

      const otherActivities = await this.otherActivitiesRepository
        .createQueryBuilder('otherActivities')
        .where('otherActivities.area_id = :area_id', { area_id: area.id })
        .getMany();

      return { ...area, crops, applications, otherActivities };
    }));

    // console.log(areasWithCrops);

    return { property, areas: areasWithCrops };
  }
}

export default ReportsRepository;
