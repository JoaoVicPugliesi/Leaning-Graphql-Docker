import { ISelectBrandUseCase } from '@application/useCases/Brand/SelectBrand/ISelectBrandUseCase';
import { iRedisBrandRepository } from '@infra/repositories/Brand/RedisBrandRepository';

export class ISelectBrandFactory {
  build(): ISelectBrandUseCase {
    return new ISelectBrandUseCase(iRedisBrandRepository);
  }
}
