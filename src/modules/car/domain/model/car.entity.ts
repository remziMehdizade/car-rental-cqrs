import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../enums/car.category-enum';

@Entity({ name: 'car' })
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  brand: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  model: string;

  @Column({ type: 'int', nullable: false })
  year: number;

  @Column()
  category: Category;

  @Column({
    type: 'decimal',
    nullable: false,
  })
  pricePerDay: number;

  // @OneToMany(() => Order, (order) => order.car, {
  //   nullable: true,
  // })
  // @Field(() => [Order], { nullable: true })
  // order!: Order[];
}
