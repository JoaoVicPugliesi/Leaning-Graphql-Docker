import { ISelectCarUseCase } from '@application/useCases/Car/SelectCar/ISelectCarUseCase';
import { iRedisCarRepository } from '@infra/repositories/Car/RedisCarRepository';

export class ISelectCarFactory {
  build(): ISelectCarUseCase {
    return new ISelectCarUseCase(iRedisCarRepository);
  }
}
