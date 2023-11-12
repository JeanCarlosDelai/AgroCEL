import { IProperty } from "@modules/property/domain/models/IProperty";
import { IAreaData } from "./IAreaData";

export interface IReportsData {
  property: IProperty;
  areas: IAreaData[];
}
