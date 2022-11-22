import { Category } from '../domain/enums/car.category-enum';
import { UpdateCarInput } from '../graphql/types/update-car-mutation-types';

export class UpdateCarCommand {
  constructor(
    public readonly carId?: number,

    public readonly carInput?: UpdateCarInput,
  ) {}
}
