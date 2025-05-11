import { ISaveCarUseCase } from './ISaveCarUseCase';
import {
  CarAlreadyExistsErrorResponse,
  ISaveCarDTO,
  ISaveCarResponse,
} from './ISaveCarDTO';
import { ISaveCarFactoryInMemory } from '@application/factories/Car/SaveCar/ISaveCarFactoryInMemory';
import { Car } from '@domain/entities/Car';
import { randomUUID } from 'crypto';

const cars: Car[] = [];

describe('Should analyse every possible end when saving a car', () => {
  test('Should save a car precisely', async () => {
    // Arrange
    const iFactory = new ISaveCarFactoryInMemory(cars);
    const sut: ISaveCarUseCase = iFactory.build();
    const { 
        name, 
        year, 
        brand_id 
    }: ISaveCarDTO = {
      name: 'Mclaren Senna',
      year: 2018,
      brand_id: randomUUID(),
    };
    // Act
    const response: CarAlreadyExistsErrorResponse | ISaveCarResponse =
      await sut.execute({
        name,
        year,
        brand_id,
      });
    // Assert
    expect(response).not.toBeInstanceOf(CarAlreadyExistsErrorResponse);
    expect(response).toHaveProperty('success');
  });

  test('Should not save a car', async () => {
    const iFactory = new ISaveCarFactoryInMemory(cars);
    const sut: ISaveCarUseCase = iFactory.build();
    const { 
        name, 
        year, 
        brand_id 
    }: ISaveCarDTO = {
      name: 'Mclaren Senna',
      year: 2018,
      brand_id: randomUUID(),
    };
    // Act
    const response: CarAlreadyExistsErrorResponse | ISaveCarResponse =
      await sut.execute({
        name,
        year,
        brand_id,
      });
    // Assert
    expect(response).toBeInstanceOf(CarAlreadyExistsErrorResponse);
    expect(response).not.toHaveProperty('success');
  })
});
