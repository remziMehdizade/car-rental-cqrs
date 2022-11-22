import { Field, InputType } from "@nestjs/graphql";
import { Category } from "../../domain/enums/car.category-enum";

@InputType()
export class CreateCarInput {
  @Field()
  brand: string;

  @Field()
  model: string;

  @Field()
  year: number;

  @Field(() => Category)
  category: Category;

  @Field()
  pricePerDay: number;
}
