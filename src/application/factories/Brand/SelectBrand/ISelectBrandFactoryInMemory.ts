import { Brand } from '@domain/entities/Brand';
import { ISelectBrandUseCase } from '@application/useCases/Brand/SelectBrand/ISelectBrandUseCase';
import { InMemoryBrandRepository } from '@infra/repositories/Brand/InMemoryBrandRepository';

export class ISelectBrandFactoryInMemory {
  constructor(
    private readonly brands: Brand[]
  ) {}
  build(): ISelectBrandUseCase {
    const iBrandRepository = new InMemoryBrandRepository(this.brands);
    return new ISelectBrandUseCase(iBrandRepository);
  }
}
