
const Queue = require('bull');
const dataQueue = new Queue('dataQueue', { redis: { host: '127.0.0.1', port: 6379 } });






const Destination = require('../models/Destination');
const axios = require('axios');
const Log = require('../models/Log');

dataQueue.process(async (job) => {
  const { logId, accountId, data } = job.data;
  const destinations = await Destination.find({ account_id: accountId });

  for (let dest of destinations) {
    try {
      await axios({
        method: dest.method,
        url: dest.url,
        headers: dest.headers,
        data
      });
    } catch (err) {
      await Log.findByIdAndUpdate(logId, { status: 'failed', processed_timestamp: new Date() });
      return;
    }
  }

  await Log.findByIdAndUpdate(logId, { status: 'success', processed_timestamp: new Date() });
});
