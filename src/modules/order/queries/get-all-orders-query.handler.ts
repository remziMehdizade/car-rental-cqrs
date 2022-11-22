import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/modules/order/domain/model/order.etity';
import { GetAllOrdersQuery } from './get-all-orders-query';

@QueryHandler(GetAllOrdersQuery)
export class GetAllOrdersQueryHandler
  implements IQueryHandler<GetAllOrdersQuery>
{
  constructor(@InjectRepository(Order) private orderRepo: Repository<Order>) {}
  execute(query: GetAllOrdersQuery): Promise<Order[]> {
    return this.orderRepo.find();
  }
}
