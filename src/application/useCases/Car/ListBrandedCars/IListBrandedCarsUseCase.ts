import { ICarRepository } from '@domain/repositories/ICarRepository';
import { BrandedCarsNotFoundErrorResponse, IListBrandedCarsDTO, IListBrandedCarsResponse } from './IListBrandedCarsDTO';
import { Car } from '@domain/entities/Car';

export class IListBrandedCarsUseCase {
  constructor(
    private readonly iCarRepository: ICarRepository
  ) {}

  async execute({
    starts,
    ends,
    brand_id
  }: IListBrandedCarsDTO): Promise<BrandedCarsNotFoundErrorResponse | IListBrandedCarsResponse> {
    const cars: Car[] | null = await this.iCarRepository.listBranded({
        starts,
        ends,
        brand_id
    });

    if(!cars) return new BrandedCarsNotFoundErrorResponse();

    return {
        cars: cars
    };
  }
}
