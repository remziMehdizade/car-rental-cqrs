import { Category } from '../domain/enums/car.category-enum';

export class CreateCarCommand {
  constructor(
    public readonly brand?: string,

    public readonly model?: string,

    public readonly year?: number,

    public readonly category?: Category,

    public readonly pricePerDay?: number,
  ) {}
}
