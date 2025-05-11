import { Brand } from '@domain/entities/Brand';
import { IBrandRepository } from '@domain/repositories/IBrandRepository';
import { BrandNotFoundErrorResponse, ISelectBrandDTO, ISelectBrandResponse } from './ISelectBrandDTO';

export class ISelectBrandUseCase {
  constructor(
    private readonly iBrandRepository: IBrandRepository
  ) {}

  async execute({
    id
  }: ISelectBrandDTO): Promise<BrandNotFoundErrorResponse | ISelectBrandResponse> {
    const brand: Brand | null = await this.iBrandRepository.select({
        id
    });

    if(!brand) return new BrandNotFoundErrorResponse();

    return {
        brand: brand
    }
  }
}
