export interface IApplication {
  id: string;
  area_id: string;
  used_product_id: string;
  application_type: string;
  quantity: number;
  application_date: Date;
  application_time: number;
  description: string;
  created_at: Date;
  updated_at: Date;
}
