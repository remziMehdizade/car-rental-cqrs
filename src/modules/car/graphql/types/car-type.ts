import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from '../../domain/enums/car.category-enum';

@ObjectType()
export class Car {
  @Field(() => Int)
  id: number;

  @Field({ nullable: false })
  brand: string;

  @Field({ nullable: false })
  model: string;

  @Field({ nullable: false })
  year: number;

  @Field(() => Category)
  category: Category;

  @Field({ nullable: false })
  pricePerDay: number;
}
