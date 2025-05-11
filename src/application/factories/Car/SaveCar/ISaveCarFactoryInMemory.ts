import { Car } from '@domain/entities/Car';
import { ISaveCarUseCase } from '@application/useCases/Car/SaveCar/ISaveCarUseCase';
import { InMemoryCarRepository } from '@infra/repositories/Car/InMemoryCarRepository';
import { iCryptoIdService } from '@infra/services/CryptoIdService';

export class ISaveCarFactoryInMemory {
  constructor(
    private readonly cars: Car[]
  ) {}
  build(): ISaveCarUseCase {
    const iCarRepository = new InMemoryCarRepository(this.cars);
    return new ISaveCarUseCase(iCarRepository, iCryptoIdService);
  }
}
