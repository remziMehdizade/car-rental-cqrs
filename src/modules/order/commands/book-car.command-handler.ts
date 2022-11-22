import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from 'src/modules/car/domain/model/car.entity';
import { Repository } from 'typeorm';
import { Order } from '../domain/model/order.etity';
import { BookACar } from './book-car.command';

@CommandHandler(BookACar)
export class BookACarHandler implements ICommandHandler<BookACar> {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Car) private carrRepo: Repository<Car>,
  ) {}
  async execute(command: BookACar): Promise<any> {
    const order = new Order();
    const { carId, day } = command;
    const car = await this.carrRepo.findOne({
      where: carId,
    });
    if (!car) {
      throw new NotFoundException(' Car Not Found');
    } else {
      order.car = car;
      const endDay = new Date();
      endDay.setDate(endDay.getDate() + day);
      order.endDate = endDay;
      order.days = day;

      order.price = car.pricePerDay * day;
    }

    const saveOrder = this.orderRepo.create(order);

    return await this.orderRepo.save(saveOrder);
  }
}
