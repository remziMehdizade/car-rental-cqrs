import { Car } from 'src/modules/car/domain/model/car.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdDate: Date;

  @Column({ type: 'timestamp without time zone', nullable: true, precision: 6 })
  endDate?: Date;

  @Column({ type: 'int', nullable: true })
  days: number;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  price: number;

  @ManyToOne(() => Car, (car) => car.id, {
    cascade: ['insert', 'remove'],
    nullable:false
  })
  @JoinColumn()
  car!: Car;
}
