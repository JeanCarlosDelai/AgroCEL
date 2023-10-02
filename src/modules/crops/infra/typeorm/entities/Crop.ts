import Area from '@modules/area/infra/typeorm/entities/Area';
import { ICrop } from '@modules/crops/domain/models/ICrop';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('crops')
class Crop implements ICrop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  area_id: string;

  @ManyToOne(() => Area)
  @JoinColumn({ name: 'area_id' })
  area: Area;

  @Column()
  quantity: number;

  @Column()
  crop_date: Date;

  @Column()
  crop_time: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Crop;
