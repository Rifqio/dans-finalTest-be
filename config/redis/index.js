/* eslint-disable no-undef */
const redis = require('redis');

const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

const redisConnection = async () => {
  try {
    await redisClient.on('connect', () => {
      console.log('Redis connection established');
    });
  } catch (error) {
    console.log('Redis', error.message);
  }
};

module.exports = { redisClient, redisConnection };
