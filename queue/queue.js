const { Queue } = require('bullmq');
const IORedis = require('ioredis');

const connection = new IORedis(process.env.REDIS_URL);

const submissionQueue = new Queue('code-submissions', {
  connection
});

module.exports = submissionQueue;
