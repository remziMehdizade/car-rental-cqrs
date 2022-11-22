import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from '../domain/model/car.entity';
import { CreateCarCommand } from './create-car.command';

@CommandHandler(CreateCarCommand)
export class CreateCarCommandHandler
  implements ICommandHandler<CreateCarCommand>
{
  constructor(@InjectRepository(Car) private carRepo: Repository<Car>) {}
  execute(command: CreateCarCommand): Promise<Car> {
    
    return this.carRepo.save(command);
  }
}
