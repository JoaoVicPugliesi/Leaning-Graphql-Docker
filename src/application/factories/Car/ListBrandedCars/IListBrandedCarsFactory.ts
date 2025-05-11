import { IListBrandedCarsUseCase } from '@application/useCases/Car/ListBrandedCars/IListBrandedCarsUseCase';
import { iRedisCarRepository } from '@infra/repositories/Car/RedisCarRepository';

export class IListBrandedCarsFactory {
  build(): IListBrandedCarsUseCase {
    return new IListBrandedCarsUseCase(iRedisCarRepository);
  }
}
