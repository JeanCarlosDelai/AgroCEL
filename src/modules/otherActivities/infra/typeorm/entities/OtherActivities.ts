import Area from '@modules/area/infra/typeorm/entities/Area';
import { IOtherActivities } from '@modules/otherActivities/domain/models/IOtherActivities';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('other_activities')
class OtherActivities implements IOtherActivities {
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
  activitie_category: string;

  @Column()
  activitie_date: Date;

  @Column()
  activitie_time: number;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OtherActivities;
