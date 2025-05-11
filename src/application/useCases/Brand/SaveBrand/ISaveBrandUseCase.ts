import { Brand } from '@domain/entities/Brand';
import { IBrandRepository } from '@domain/repositories/IBrandRepository';
import { IIdService } from '@domain/services/IIdService';
import {
  BrandAlreadyExistsErrorResponse,
  ISaveBrandDTO,
  ISaveBrandResponse,
} from './ISaveBrandDTO';

export class ISaveBrandUseCase {
  constructor(
    private readonly iBrandRepository: IBrandRepository,
    private readonly iIdService: IIdService
  ) {}

  async execute({
    name,
    origin_country,
    founded_at,
  }: ISaveBrandDTO): Promise<
    BrandAlreadyExistsErrorResponse | ISaveBrandResponse
  > {
    const brand: Brand | null = await this.iBrandRepository.view({
      name,
    });

    if (brand) return new BrandAlreadyExistsErrorResponse();
    const id: string = this.iIdService.v4();
    console.log(id);
    await this.iBrandRepository.save({
      id,
      name,
      origin_country,
      founded_at,
    });

    return {
      success: true,
    };
  }
}
