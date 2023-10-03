// import { ICrop } from '@modules/area/domain/models/IArea';
import Area from '@modules/area/infra/typeorm/entities/Area';
import Crop from '@modules/crops/infra/typeorm/entities/Crop';
import { ICropDestination } from '@modules/cropsDestination/domain/models/ICropDestination';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('areas')
class CropDestination implements ICropDestination {
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
  destination: string;

  @Column()
  processing_type: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CropDestination;
