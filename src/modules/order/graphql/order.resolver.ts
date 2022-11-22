import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Query, Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { plainToClass } from 'class-transformer';
import { BookACar } from '../commands/book-car.command';
import { GetAllOrdersQuery } from '../queries/get-all-orders-query';
import { GetOrderquery } from '../queries/get-order-query';
import { Order } from './types/order-type';

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Mutation(() => Order, { name: 'bookCar' })
  async bookCar(
    @Args('carId', { type: () => Int }) carId: number,
    @Args('day', { type: () => Int }) day: number,
  ) {
    const command = new BookACar(carId, day);

    return await this.commandBus.execute(command);
  }

  @Query(() => [Order], { name: 'getAllOrders' })
  async getAllOrder() {
    const command = new GetAllOrdersQuery();
    return await this.queryBus.execute(command);
  }

  @Query(() => Order, { name: 'getOrder' })
  async getOrder(@Args('id', { type: () => Int }) id: number) {
    const command = new GetOrderquery(id);

    return await this.queryBus.execute(command);
  }
}
