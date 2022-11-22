import { Field, InputType } from '@nestjs/graphql';
import { Category } from '../../domain/enums/car.category-enum';

@InputType()
export class UpdateCarInput {
  @Field()
  brand?: string;

  @Field()
  model?: string;

  @Field({ nullable: true })
  year?: number;

  @Field(() => Category,{ nullable: true })
  category?: Category;

  @Field({ nullable: true })
  pricePerDay?: number;
}
