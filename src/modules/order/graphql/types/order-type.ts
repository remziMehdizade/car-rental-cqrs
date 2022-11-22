import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Car } from 'src/modules/car/graphql/types/car-type';



@ObjectType()
export class Order {

  @Field(() => Int)
  id: number;


  @Field()
  createdDate: Date;


  @Field({ nullable: true })
  endDate?: Date;


  @Field(() => Int, { nullable: false })
  days: number;

  @Field(() => Float, { nullable: false })
  price: number;


  @Field(() => Car,{nullable:true})
  car!: Car;
}
