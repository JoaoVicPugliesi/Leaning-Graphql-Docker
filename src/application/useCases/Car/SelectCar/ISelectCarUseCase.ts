import { Car } from '@domain/entities/Car';
import { ICarRepository } from '@domain/repositories/ICarRepository';
import { CarNotFoundErrorResponse, ISelectCarDTO, ISelectCarResponse } from './ISelectCarDTO';

export class ISelectCarUseCase {
  constructor(
    private readonly iCarRepository: ICarRepository
  ) {}

  async execute({
    id
  }: ISelectCarDTO): Promise<CarNotFoundErrorResponse | ISelectCarResponse> {
    const car: Car | null = await this.iCarRepository.select({
        id
    });

    if(!car) return new CarNotFoundErrorResponse();

    return {
        car: car
    }
  }
}
