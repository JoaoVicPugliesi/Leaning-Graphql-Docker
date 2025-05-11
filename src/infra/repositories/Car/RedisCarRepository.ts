import { Car } from '@domain/entities/Car';
import { redis } from '@api/Redis';
import { ICarRepository } from '@domain/repositories/ICarRepository';
import { IListCarsDTO } from '@application/useCases/Car/ListCars/IListCarsDTO';
import { ISelectCarDTO } from '@application/useCases/Car/SelectCar/ISelectCarDTO';
import { RedisClientType } from 'redis';
import { IListBrandedCarsDTO } from '@application/useCases/Car/ListBrandedCars/IListBrandedCarsDTO';

class RedisCarRepository implements ICarRepository {
  constructor(private readonly redis: RedisClientType) {}

  private getCarKey(id: string): string {
    return `car:${id}`;
  }

  async save({ 
    id, 
    name, 
    year, 
    brand_id 
  }: Car): Promise<void> {
    const iCarKey = this.getCarKey(id);

    await this.redis.hSet(iCarKey, {
      id: id,
      name: name,
      year: year,
      brand_id: brand_id,
    });

    await this.redis.sAdd(`branded-cars:${brand_id}`, id);
    await this.redis.sAdd('cars', id);
  }

  async view({ 
    name, 
    year 
  }: Pick<Car, 'name' | 'year'>): Promise<Car | null> {
    const carIds = await this.redis.sMembers('cars');
    for (const id of carIds) {
      const car = await this.redis.hGetAll(this.getCarKey(id));
      if (car.name === name && car.year === String(year)) {
        return {
          id: String(car.id),
          name: String(car.name),
          year: Number(car.year),
          brand_id: String(car.brand_id),
        };
      }
    }

    return null;
  }

  async list({ 
    starts, 
    ends 
  }: IListCarsDTO): Promise<Car[] | null> {
    const allCarIds = await this.redis.sMembers('cars');
    const selectedIds = allCarIds.slice(starts, ends);
    const cars: Car[] = [];
    for (const id of selectedIds) {
      const car = await this.redis.hGetAll(this.getCarKey(id));
      if (Object.keys(car).length) {
        cars.push({
          id: String(car.id),
          name: String(car.name),
          year: Number(car.year),
          brand_id: String(car.brand_id),
        });
      }
    }
    return cars.length ? cars : null;
  }

  async select({ id }: ISelectCarDTO): Promise<Car | null> {
    const car = await this.redis.hGetAll(this.getCarKey(id));
    if (!car || Object.keys(car).length === 0) return null;
    return {
      id: String(car.id),
      name: String(car.name),
      year: Number(car.year),
      brand_id: String(car.brand_id),
    };
  }

  async listBranded({
    starts,
    ends,
    brand_id,
  }: IListBrandedCarsDTO): Promise<Car[] | null> {
    const allCarIds = await this.redis.sMembers(`branded-cars:${brand_id}`);
    const selectedIds = allCarIds.slice(starts, ends);
    const cars: Car[] = [];
    for (const id of selectedIds) {
      const car = await this.redis.hGetAll(this.getCarKey(id));
      if (Object.keys(car).length) {
        cars.push({
          id: String(car.id),
          name: String(car.name),
          year: Number(car.year),
          brand_id: String(car.brand_id),
        });
      }
    }
    return cars.length ? cars : null;
  }
}

const iRedisCarRepository = new RedisCarRepository(redis);
export { iRedisCarRepository };
