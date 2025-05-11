import { Car } from '@domain/entities/Car';
import { ICarRepository } from '@domain/repositories/ICarRepository';
import { IListCarsDTO } from '@application/useCases/Car/ListCars/IListCarsDTO';
import { ISelectCarDTO } from '@application/useCases/Car/SelectCar/ISelectCarDTO';
import { IListBrandedCarsDTO } from '@application/useCases/Car/ListBrandedCars/IListBrandedCarsDTO';

export class InMemoryCarRepository implements ICarRepository {
  constructor(
    private readonly cars: Car[]
  ) {}

  async save({
    id,
    name,
    year,
    brand_id
  }: Car): Promise<void> {
    this.cars.push({
      id,
      name,
      year,
      brand_id
    });
  }

  async view({
    name,
    year
  }: Pick<Car, 'name' | 'year'>): Promise<Car | null> {
    const car: Car | undefined = this.cars.find((i: Car) => 
      i.name === name && i.year === year
    );

    if(car) return car;
    
    return null;
  }

  async list({
    starts
  }: IListCarsDTO): Promise<Car[] | null> {
    let cars: Car[] = [];
    let i: number = 0;
    for(i = starts; i < this.cars.length; i++) {
      const current: Car = this.cars[i];
      cars.push(current);
    } 

    if(cars.length) return cars;

    return null;
  }

  async select({
    id
  }: ISelectCarDTO): Promise<Car | null> {
    const car: Car | undefined = this.cars.find((i: Car) => i.id === id);
    
    if(car) return car;

    return null
  }

  async listBranded({
    starts,
    ends,
    brand_id
  }: IListBrandedCarsDTO): Promise<Car[] | null> {
    const cars: Car[] | undefined = this.cars.filter((i: Car) => i.brand_id === brand_id);
    if(!cars || Object.keys(cars).length === 0) {
      return null
    }
    
    const carsSliced = cars.slice(starts, ends);
    return carsSliced;
  }
}
