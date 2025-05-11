import { Car } from '@domain/entities/Car';
import { InMemoryCarRepository } from '@infra/repositories/Car/InMemoryCarRepository';
import { IListCarsUseCase } from '@application/useCases/Car/ListCars/IListCarsUseCase';

export class IListCarsFactoryInMemory {
  constructor(
    private readonly cars: Car[]
  ) {}
  build(): IListCarsUseCase {
    const iCarRepository = new InMemoryCarRepository(this.cars);
    return new IListCarsUseCase(iCarRepository);
  }
}
