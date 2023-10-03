export interface ICropDestination {
  id: string;
  name: string;
  area_id: string;
  crop_id: string;
  destination: string;
  processing_type: string;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
