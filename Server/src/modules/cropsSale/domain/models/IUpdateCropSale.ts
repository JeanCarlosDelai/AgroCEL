export interface IUpdateCropSale {
  id: string;
  name: string;
  area_id: string;
  crop_id: string;
  purchasing_entity: string;
  purchasing_entity_cnpj: string;
  graduation: number;
  price: number;
  quantity: number;
  discharge_date: Date;
}
