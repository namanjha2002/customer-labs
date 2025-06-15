const Account = require('../models/Account');
const Log = require('../models/Log');
const dataQueue = require('../queues/dataQueue');

exports.receiveData = async (req, res) => {
  const token = req.headers['cl-x-token'];
  const eventId = req.headers['cl-x-event-id'];
  if (!token || !eventId) return res.status(400).json({ success: false, message: 'Missing headers' });

  const account = await Account.findOne({ app_secret_token: token });
  if (!account) return res.status(401).json({ success: false, message: 'Invalid token' });

  const log = await Log.create({
    event_id: eventId,
    account_id: account._id,
    received_data: req.body,
    received_timestamp: new Date()
  });

  dataQueue.add({ logId: log._id, accountId: account._id, data: req.body });
  res.json({ success: true, message: 'Data Received' });
};
