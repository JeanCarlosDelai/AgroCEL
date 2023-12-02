export interface IArea {
  id: string;
  name: string;
  property_id: string;
  species: string;
  variety: string;
  driving_system: string;
  rookstock_type: string;
  cultivated_area: number;
  geographic_coordinates: string;
  implementation_date: Date;
  number_rows: number;
  distance_between_rows: number;
  distance_between_plants: number;
  number_plants: number;
  created_at: Date;
  updated_at: Date;
}
