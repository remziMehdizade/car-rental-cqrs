import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from '../domain/model/car.entity';
import { DeleteCarCommand } from './delete-car-command';

@CommandHandler(DeleteCarCommand)
export class DeleteCarCommandHandler
  implements ICommandHandler<DeleteCarCommand>
{
  constructor(@InjectRepository(Car) private carRepo: Repository<Car>) {}
  async execute(command: DeleteCarCommand): Promise<string> {
    const car = await this.carRepo
      .createQueryBuilder('c')
      .where('c.id = :id', { id: command.carId })
      .getOne();
    if (!car) {
      throw new NotFoundException('Car Not Found !');
    }

    await this.carRepo.delete(car.id);

    return `This Id: ${car.id} car was deleted`;
  }
}
