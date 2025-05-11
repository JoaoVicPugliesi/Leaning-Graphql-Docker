import { ICarRepository } from '@domain/repositories/ICarRepository';
import {
  CarAlreadyExistsErrorResponse,
  ISaveCarDTO,
  ISaveCarResponse,
} from './ISaveCarDTO';
import { IIdService } from '@domain/services/IIdService';
import { Car } from '@domain/entities/Car';

export class ISaveCarUseCase {
  constructor(
    private readonly iCarRepository: ICarRepository,
    private readonly iIdService: IIdService
  ) {}

  async execute({
    name,
    year,
    brand_id,
  }: ISaveCarDTO): Promise<CarAlreadyExistsErrorResponse | ISaveCarResponse> {
    const isCar: Car | null = await this.iCarRepository.view({
      name,
      year,
    });

    if (isCar) return new CarAlreadyExistsErrorResponse();
    const id = this.iIdService.v4();
    await this.iCarRepository.save({
      id,
      name,
      year,
      brand_id,
    });

    return {
      success: true,
    };
  }
}
