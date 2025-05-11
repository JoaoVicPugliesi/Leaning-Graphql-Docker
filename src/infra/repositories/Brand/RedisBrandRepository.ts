import { Brand } from '@domain/entities/Brand';
import { ISaveBrandDTO } from '@application/useCases/Brand/SaveBrand/ISaveBrandDTO';
import { IBrandRepository } from '@domain/repositories/IBrandRepository';
import { RedisClientType } from 'redis';
import { redis } from '@api/Redis';
import { ISelectBrandDTO } from '@application/useCases/Brand/SelectBrand/ISelectBrandDTO';

export class RedisBrandRepository implements IBrandRepository {
  constructor(
    private readonly redis: RedisClientType
  ) {}

  private getBrandKey(id: string): string {
    return `brand:${id}`;
  }

  async save({ 
    id, 
    name, 
    origin_country, 
    founded_at 
  }: Brand): Promise<void> {
    const brandKey = this.getBrandKey(id);

    await this.redis.hSet(brandKey, {
      id: id,
      name: name,
      origin_country: origin_country,
      founded_at: founded_at,
    });

    await this.redis.sAdd('brands', id);
  }

  async view({ 
    name 
  }: Pick<ISaveBrandDTO, 'name'>): Promise<Brand | null> {
    const brandIds = await this.redis.sMembers('brands');
    for (const id of brandIds) {
      const brand = await this.redis.hGetAll(this.getBrandKey(id));
      if (brand.name === name) {
        return {
          id: String(brand.id),
          name: String(brand.name),
          origin_country: String(brand.origin_country),
          founded_at: Number(brand.founded_at),
        };
      }
    }

    return null;
  }

  async select({ 
    id 
  }: ISelectBrandDTO): Promise<Brand | null> {
    const brand = await this.redis.hGetAll(this.getBrandKey(id));
    if (!brand || Object.keys(brand).length === 0) return null;
    return {
      id: String(brand.id),
      name: String(brand.name),
      origin_country: String(brand.origin_country),
      founded_at: Number(brand.founded_at),
    };
  }
}

const iRedisBrandRepository = new RedisBrandRepository(redis);

export { iRedisBrandRepository };
