import redis from "redis";
import config from "./config";

export default redis.createClient({
  url: `redis://${config.redisHost}:${config.redisPort}`,
  password: config.redisPwd,
});
