export interface IUpdateApplication {
  id: string;
  area_id: string;
  used_product_id: string;
  application_type: string;
  quantity: number;
  application_date: Date;
  application_time: number;
  description: string;
}
