import { Car } from '@domain/entities/Car';
import { ISelectCarUseCase } from './ISelectCarUseCase';
import { ISelectCarFactoryInMemory } from '@application/factories/Car/SelectCar/ISelectCarFactoryInMemory';
import {
  CarNotFoundErrorResponse,
  ISelectCarDTO,
  ISelectCarResponse,
} from './ISelectCarDTO';
import { randomUUID } from 'crypto';

const car: Car = {
  id: randomUUID(),
  name: 'Mclaren Senna',
  year: 2018,
  brand: 'Mclaren',
};
const cars: Car[] = [];
cars.push(car);

describe('Should analyse every possible end related to selecting a car', () => {
  it('Should select a car precisely', async () => {
    // Arrange
    const iFactory = new ISelectCarFactoryInMemory(cars);
    const sut: ISelectCarUseCase = iFactory.build();
    const { 
        id 
    }: ISelectCarDTO = {
      id: car.id,
    };
    // Act
    const response: CarNotFoundErrorResponse | ISelectCarResponse =
      await sut.execute({
        id,
      });
    // Assert
    expect(response).not.toBeInstanceOf(CarNotFoundErrorResponse);
    expect(response).toHaveProperty('car');
  });
  it('Should not select a car', async () => {
    // Arrange
    const iFactory = new ISelectCarFactoryInMemory(cars.splice(0, -1));
    const sut: ISelectCarUseCase = iFactory.build();
    const { id }: ISelectCarDTO = {
      id: car.id,
    };
    // Act
    const response: CarNotFoundErrorResponse | ISelectCarResponse =
      await sut.execute({
        id,
      });
    // Assert
    expect(response).toBeInstanceOf(CarNotFoundErrorResponse);
    expect(response).not.toHaveProperty('car');
  });
});
