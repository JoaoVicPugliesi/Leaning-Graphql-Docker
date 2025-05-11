import { Car } from '@domain/entities/Car';
import { ISelectCarUseCase } from '@application/useCases/Car/SelectCar/ISelectCarUseCase';
import { InMemoryCarRepository } from '@infra/repositories/Car/InMemoryCarRepository';

export class ISelectCarFactoryInMemory {
  constructor(
    private readonly cars: Car[]
  ) {}
  
  build(): ISelectCarUseCase {
    const iCarRepository = new InMemoryCarRepository(this.cars);
    return new ISelectCarUseCase(iCarRepository);
  }
}
