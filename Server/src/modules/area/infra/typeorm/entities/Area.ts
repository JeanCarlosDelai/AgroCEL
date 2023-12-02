import { IArea } from '@modules/area/domain/models/IArea';
import Property from '@modules/property/infra/typeorm/entities/Property';
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
class Area implements IArea {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  property_id: string;

  @ManyToOne(() => Property)
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @Column()
  species: string;

  @Column()
  variety: string;

  @Column()
  driving_system: string;

  @Column()
  rookstock_type: string;

  @Column()
  cultivated_area: number;

  @Column()
  geographic_coordinates: string;

  @Column()
  implementation_date: Date;

  @Column()
  number_rows: number;

  @Column()
  distance_between_rows: number;

  @Column()
  distance_between_plants: number;

  @Column()
  number_plants: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Area;
