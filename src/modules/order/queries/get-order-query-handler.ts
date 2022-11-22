import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../domain/model/order.etity';
import { GetOrderquery } from './get-order-query';

@QueryHandler(GetOrderquery)
export class GetOrderQueryHandler implements IQueryHandler<GetOrderquery> {
  constructor(@InjectRepository(Order) private orderRepo: Repository<Order>) {}
  async execute(query: GetOrderquery): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: query.orderId,
      relations: ['car'],
    });

    if (!order) {
      throw new NotFoundException('Order Not Found!');
    }
    return order;
  }
}
