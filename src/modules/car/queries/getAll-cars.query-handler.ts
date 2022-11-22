import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from '../domain/model/car.entity';
import { GetAllCarQuery } from './getAll-car.query';

@QueryHandler(GetAllCarQuery)
export class GetAllCarQueryHandler implements IQueryHandler<GetAllCarQuery> {

    constructor(
        @InjectRepository(Car) private carRepo: Repository<Car>,
      ) {}
    execute(query: GetAllCarQuery): Promise<Car[]> {
        return this.carRepo.find();
       
    }



}
