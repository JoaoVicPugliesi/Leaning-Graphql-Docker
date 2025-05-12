import { ISaveBrandUseCase } from '@application/useCases/Brand/SaveBrand/ISaveBrandUseCase';
import { Brand } from '@domain/entities/Brand';
import { InMemoryBrandRepository } from '@infra/repositories/Brand/InMemoryBrandRepository';
import { iCryptoIdService } from '@infra/services/CryptoIdService';

export class ISaveBrandFactoryInMemory {
  constructor(
    private readonly brands: Brand[]
  ) {}
  build(): ISaveBrandUseCase {
    const iBrandRepository = new InMemoryBrandRepository(this.brands);
    return new ISaveBrandUseCase(iBrandRepository, iCryptoIdService);
  }
}
