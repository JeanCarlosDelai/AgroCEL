import Area from '@modules/area/infra/typeorm/entities/Area';
import Crop from '@modules/crops/infra/typeorm/entities/Crop';
import { ICropSale } from '@modules/cropsSale/domain/models/ICropSale';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('crops_sale')
class CropSale implements ICropSale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  area_id: string;

  @ManyToOne(() => Area)
  @JoinColumn({ name: 'area_id' })
  area: Area;

  @Column({ nullable: true })
  crop_id: string;

  @ManyToOne(() => Crop)
  @JoinColumn({ name: 'crop_id' })
  crop: Crop;

  @Column()
  purchasing_entity: string;

  @Column()
  purchasing_entity_cnpj: string;

  @Column()
  graduation: number;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  discharge_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CropSale;
