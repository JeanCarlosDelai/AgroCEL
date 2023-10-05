import { IApplication } from '@modules/application/domain/models/IApplication';
import Area from '@modules/area/infra/typeorm/entities/Area';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('application')
class Application implements IApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  area_id: string;

  @ManyToOne(() => Area)
  @JoinColumn({ name: 'area_id' })
  area: Area;

  @Column()
  used_product: string;

  @Column()
  application_type: string;

  @Column()
  quantity: number;

  @Column()
  description: string;

  @Column()
  application_date: Date;

  @Column()
  application_time: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Application;
