import { Car } from '@domain/entities/Car';
import { IListBrandedCarsFactoryInMemory } from '@application/factories/Car/ListBrandedCars/IListBrandedCarsFactoryInMemory';
import { IListBrandedCarsUseCase } from './IListBrandedCarsUseCase';
import {
  BrandedCarsNotFoundErrorResponse,
  IListBrandedCarsDTO,
  IListBrandedCarsResponse,
} from './IListBrandedCarsDTO';

const car: Car = {
    id: '4df3e0140926fbf5e82f3202bc632381484452f2cb7bcfadd111a07b353724ae8bb',
    name: 'Ferrari',
    year: 1998,
    brand_id: '5705f099bfab92c2b45536462b0b8aa1c0a91c32bcc61d0ff1f754da79719'
}

const cars: Car[] = [];
cars.push(car);

describe('Should analyse every possible end related to listing branded cars', () => {
  it('Should list branded cars precisely', async () => {
    // Arrange
    const iFactory = new IListBrandedCarsFactoryInMemory(cars);
    const sut: IListBrandedCarsUseCase = iFactory.build();
    const { 
        starts, 
        ends, 
        brand_id 
    }: IListBrandedCarsDTO = {
      starts: 0,
      ends: 10,
      brand_id: '5705f099bfab92c2b45536462b0b8aa1c0a91c32bcc61d0ff1f754da79719',
    };
    // Act
    const response:
      | BrandedCarsNotFoundErrorResponse
      | IListBrandedCarsResponse = await sut.execute({
      starts,
      ends,
      brand_id,
    });
    // Assert
    expect(starts).toBeGreaterThanOrEqual(0);
    expect(ends).toBeGreaterThan(starts);
    expect(response).not.toBeInstanceOf(BrandedCarsNotFoundErrorResponse);
    expect(response).toHaveProperty('cars');
});

  it('Should not list branded cars', async () => {
    // Arrange
    const iFactory = new IListBrandedCarsFactoryInMemory(cars);
    const sut: IListBrandedCarsUseCase = iFactory.build();
    const { 
        starts,
        ends,
        brand_id
    }: IListBrandedCarsDTO = {
        starts: 0,
        ends: 10,
        brand_id: '4df3e0140926fbf5e82f3202bc632381484452f2cb7bcfadd111a07b353724ae8bb'
    }
    // Act
    const response:
      | BrandedCarsNotFoundErrorResponse
      | IListBrandedCarsResponse = await sut.execute({
      starts,
      ends,
      brand_id,
    });
    // Assert
    expect(starts).toBeGreaterThanOrEqual(0);
    expect(ends).toBeGreaterThan(starts);
    expect(response).toBeInstanceOf(BrandedCarsNotFoundErrorResponse);
    expect(response).not.toHaveProperty('cars');
})
});
