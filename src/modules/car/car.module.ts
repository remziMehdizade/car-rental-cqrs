import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCarCommandHandler } from './commands/create-car.commands-handler';
import { DeleteCarCommandHandler } from './commands/delete-car-command-handler';
import { UpdateCarCommandHandler } from './commands/update-car.commands-handler';
import { Car } from './domain/model/car.entity';
import { CarResolver2 } from './graphql/car.resolver';
import { GetCarQueryHandler } from './queries/get-car.query-handler';
import { GetAllCarQueryHandler } from './queries/getAll-cars.query-handler';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), CqrsModule],
  providers: [
    CarResolver2,
    GetAllCarQueryHandler,
    GetCarQueryHandler,
    CreateCarCommandHandler,
    UpdateCarCommandHandler,
    DeleteCarCommandHandler,
    GetAllCarQueryHandler
  ],
  exports: [],
})
export class CarModule {}
