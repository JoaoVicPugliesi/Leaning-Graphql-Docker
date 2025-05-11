import { ISaveBrandUseCase } from '@application/useCases/Brand/SaveBrand/ISaveBrandUseCase';
import { iRedisBrandRepository } from '@infra/repositories/Brand/RedisBrandRepository';
import { iCryptoIdService } from '@infra/services/CryptoIdService';

export class ISaveBrandFactory {
  build(): ISaveBrandUseCase {
    return new ISaveBrandUseCase(iRedisBrandRepository, iCryptoIdService);
  }
}
