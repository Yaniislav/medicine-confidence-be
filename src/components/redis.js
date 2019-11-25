const redis = require('redis');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const { REDIS_PORT, REDIS_HOST } = process.env;

const redisClient = redis.createClient(REDIS_PORT, REDIS_HOST);

module.exports = redisClient;
