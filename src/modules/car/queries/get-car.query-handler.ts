import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from '../graphql/types/car-type';
import { GetCarQuery } from './get-car.query';

@QueryHandler(GetCarQuery)
export class GetCarQueryHandler implements IQueryHandler<GetCarQuery> {
  constructor(@InjectRepository(Car) private carRepo: Repository<Car>) {}
  execute(query: GetCarQuery): Promise<Car> {
    //return this.carRepo.findOne({ where:  query.carId  });
    return this.carRepo
      .createQueryBuilder('c')
      .where('c.id = :id', { id: query.carId })
      .getOne();
  }
}
