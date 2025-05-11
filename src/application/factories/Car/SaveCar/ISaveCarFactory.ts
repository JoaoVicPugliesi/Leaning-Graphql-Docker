import { ISaveCarUseCase } from '@application/useCases/Car/SaveCar/ISaveCarUseCase';
import { iRedisCarRepository } from '@infra/repositories/Car/RedisCarRepository';
import { iCryptoIdService } from '@infra/services/CryptoIdService';

export class ISaveCarFactory {
  build(): ISaveCarUseCase {
    return new ISaveCarUseCase(
      iRedisCarRepository,
      iCryptoIdService
    );
  }
}
