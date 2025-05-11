import { ICarRepository } from "@domain/repositories/ICarRepository";
import { CarsNotFoundErrorResponse, IListCarsDTO, IListCarsResponse } from "./IListCarsDTO";
import { Car } from "@domain/entities/Car";

export class IListCarsUseCase {
  constructor(
    private readonly iCarRepository: ICarRepository
  ) {}

  async execute({
    starts,
    ends
  }: IListCarsDTO): Promise<CarsNotFoundErrorResponse | IListCarsResponse> {
    const cars: Car[] | null = await this.iCarRepository.list({
        starts,
        ends
    });

    if(!cars) return new CarsNotFoundErrorResponse();

    return {
        cars: cars
    };
  }
}
