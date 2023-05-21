import { environment } from '../environments/index';

const { REDIS_URL } = environment;

export const RedisConfig = {
  url: REDIS_URL,
};
