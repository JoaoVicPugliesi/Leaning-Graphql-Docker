import { createClient, RedisClientType } from 'redis';

class Redis {
  private readonly redis: RedisClientType;

  constructor() {
    this.redis = createClient({
      url: process.env.REDIS_URL
    });
  }

  async connect() {
    await this.redis.connect();
  }

  accessRedis(): RedisClientType {
    return this.redis;
  }
}

const iRedisInstance = new Redis();
(async () => {
  await iRedisInstance.connect();
})();
const redis: RedisClientType = iRedisInstance.accessRedis();

export { redis };
