import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Resolver, Query, Int, Args, Mutation } from '@nestjs/graphql';
import { GetCarQuery } from '../queries/get-car.query';
import { GetAllCarQuery } from '../queries/getAll-car.query';
import { Car } from './types/car-type';
import { CreateCarInput } from './types/create-car-mutation-types';
import { plainToClass } from 'class-transformer';
import { CreateCarCommand } from '../commands/create-car.command';
import { UpdateCarInput } from './types/update-car-mutation-types';
import { UpdateCarCommand } from '../commands/update-car.command';
import { DeleteCarCommand } from '../commands/delete-car-command';

@Resolver(() => Car)
export class CarResolver2 {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Mutation(() => Car)
  async createCar(@Args('createCarInput') createCarInput: CreateCarInput) {
    const command = plainToClass(CreateCarCommand, createCarInput);
 
    return  await this.commandBus.execute(command);
  }

  @Query(() => [Car])
  async getAllCars() {
    return await this.queryBus.execute(new GetAllCarQuery());
  }

  @Query(() => Car, { name: 'getCar' })
  async getCar(@Args('id', { type: () => Int }) id: number) {
    return await this.queryBus.execute(new GetCarQuery(id));
  }

  @Query(() => [Car], { name: 'getAllAvailableCars' })
  async getAllAvailableCars() {
    return await this.queryBus.execute(new GetAllCarQuery());
  }

  @Mutation(() => Car, { name: 'updateCar' })
  async updateCar(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateCarInput') updateCarInput: UpdateCarInput,
  ) {
    const command = new UpdateCarCommand(id, updateCarInput);
    return await this.commandBus.execute(command);
  }

  @Mutation(() => String)
  async deleteCar(@Args('id', { type: () => Int }) id: number):Promise<string> {
    const command = new DeleteCarCommand(id);
    return await this.commandBus.execute(command);
  }
}
