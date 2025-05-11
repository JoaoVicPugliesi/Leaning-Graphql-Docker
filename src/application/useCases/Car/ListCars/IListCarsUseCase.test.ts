import { IListCarsFactoryInMemory } from '@application/factories/Car/ListCars/IListCarsFactoryInMemory';
import { Car } from '@domain/entities/Car';
import { IListCarsUseCase } from './IListCarsUseCase';
import {
  CarsNotFoundErrorResponse,
  IListCarsDTO,
  IListCarsResponse,
} from './IListCarsDTO';
import { randomUUID } from 'crypto';

const car: Car = {
    id: randomUUID(),
    name: 'Mclaren Senna',
    year: 2018,
    brand_id: '1580506e-314e-4e3b-be42-27e51c837b94'
}
const cars: Car[] = [];
cars.push(car);

describe('Should analyse every possible end when listing cars', () => {
  it('Should list cars precisely', async () => {
    // Arrange
    const iFactory = new IListCarsFactoryInMemory(cars);
    const sut: IListCarsUseCase = iFactory.build();
    const { starts, ends }: IListCarsDTO = {
      starts: 0,
      ends: -1,
    };
    // Act
    const response: CarsNotFoundErrorResponse | IListCarsResponse =
      await sut.execute({
        starts,
        ends,
      });
    // Assert
    expect(response).not.toBeInstanceOf(CarsNotFoundErrorResponse);
    expect(response).toHaveProperty('cars');
  });

  it('Should not list cars', async () => {
    // Arrange
    const iFactory = new IListCarsFactoryInMemory(cars);
    const sut: IListCarsUseCase = iFactory.build();
    const { starts, ends }: IListCarsDTO = {
      starts: 1,
      ends: -1,
    };
    // Act
    const response: CarsNotFoundErrorResponse | IListCarsResponse =
      await sut.execute({
        starts,
        ends,
      });

    // Assert
    expect(response).toBeInstanceOf(CarsNotFoundErrorResponse);
    expect(response).not.toHaveProperty('cars');
  })
});
