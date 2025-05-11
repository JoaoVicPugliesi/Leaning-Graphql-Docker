import { Car } from '@domain/entities/Car';
import { InMemoryCarRepository } from '@infra/repositories/Car/InMemoryCarRepository';
import { IListBrandedCarsUseCase } from '@application/useCases/Car/ListBrandedCars/IListBrandedCarsUseCase';

export class IListBrandedCarsFactoryInMemory {
  constructor(
    private readonly cars: Car[]
  ) {}
  build(): IListBrandedCarsUseCase {
    const iCarRepository = new InMemoryCarRepository(this.cars);
    return new IListBrandedCarsUseCase(iCarRepository);
  }
}
