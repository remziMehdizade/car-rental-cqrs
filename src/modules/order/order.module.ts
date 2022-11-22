import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from '../car/domain/model/car.entity';
import { BookACarHandler } from './commands/book-car.command-handler';
import { Order } from './domain/model/order.etity';
import { OrderResolver } from './graphql/order.resolver';
import { GetAllOrdersQueryHandler } from './queries/get-all-orders-query.handler';
import { GetOrderQueryHandler } from './queries/get-order-query-handler';


@Module({
  imports: [TypeOrmModule.forFeature([Order,Car]),CqrsModule],
  providers: [OrderResolver,GetAllOrdersQueryHandler,GetOrderQueryHandler,BookACarHandler],
  exports: [],
})
export class OrderModule {}
