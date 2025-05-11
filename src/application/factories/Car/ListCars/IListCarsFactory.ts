import { IListCarsUseCase } from '@application/useCases/Car/ListCars/IListCarsUseCase';
import { iRedisCarRepository } from '@infra/repositories/Car/RedisCarRepository';

export class IListCarsFactory {
  build(): IListCarsUseCase {
    return new IListCarsUseCase(iRedisCarRepository);
  }
}
