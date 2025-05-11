import { ICacheProvider, ISetOptions } from '@domain/providers/ICacheProvider';
import { redis } from '@api/Redis';
import { RedisClientType } from 'redis';

class RedisCacheProvider implements ICacheProvider {
  constructor(
    private readonly redis: RedisClientType
  ) {}
  
  async set(key: string, value: string, options?: ISetOptions): Promise<void> {
    await this.redis.set(key, value, options);
  }
  async get(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }
  async incr(key: string): Promise<number> {
    return await this.redis.incr(key);  
  }
  async decr(key: string): Promise<number> {
    return await this.redis.decr(key);
  }
  async expire(key: string, ttl: number): Promise<void> {
    await this.redis.expire(key, ttl);
  }
  async ttl(key: string): Promise<number> {
    return await this.redis.ttl(key);  
  }
  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }
  async lPush(key: string, value: string): Promise<void> {
    await this.redis.lPush(key, value);
  }
  async lSet(key: string, index: number, element: string): Promise<void> {
    await this.redis.lSet(key, index, element);
  }
  async lRange(key: string, start: number, stop: number): Promise<string[]> {
    return await this.redis.lRange(key, start, stop);
  }
}

const iRedisCacheProvider = new RedisCacheProvider(redis);

export { iRedisCacheProvider };
