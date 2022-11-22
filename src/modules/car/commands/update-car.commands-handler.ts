import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from '../domain/model/car.entity';
import { UpdateCarCommand } from './update-car.command';

@CommandHandler(UpdateCarCommand)
export class UpdateCarCommandHandler
  implements ICommandHandler<UpdateCarCommand>
{
  constructor(@InjectRepository(Car) private carRepo: Repository<Car>) {}
  async execute(command: UpdateCarCommand): Promise<Car> {
    const car = await this.carRepo
      .createQueryBuilder('c')
      .where('c.id = :id', { id: command.carId })
      .getOne();
    if (!car) {
      throw new NotFoundException('Car Not Found !');
    }
    const { brand, model, year, category, pricePerDay } = command.carInput;
    this.carRepo.merge(car, {
      brand,
      model,
      year,
      category,
      pricePerDay,
    });
    return await this.carRepo.save(car);; //this.carRepo.save(command);
  }
}
