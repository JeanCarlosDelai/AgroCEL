import { IReportsData } from '../models/IReportsData';

export interface IReportRepository {
  findReport(property_Id: string): Promise<IReportsData | null>;
}
