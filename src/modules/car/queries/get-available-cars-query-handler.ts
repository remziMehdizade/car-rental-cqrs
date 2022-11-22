import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from '../domain/model/car.entity';
import { GetAllCarQuery } from './getAll-car.query';

@QueryHandler(GetAllCarQuery)
export class GetAvailableCarsQueryHandler
  implements IQueryHandler<GetAllCarQuery>
{
  constructor(@InjectRepository(Car) private carRepo: Repository<Car>) {}
  async execute(query: GetAllCarQuery): Promise<Car[]> {


    return await this.carRepo
      .createQueryBuilder('car')
      .where('car.id NOT IN (SELECT DISTINCT("order"."carId") FROM "order" "order" WHERE "order"."endDate" >now())')
      .setParameter('registered', true)
      .getMany();

   
    
  }
}
