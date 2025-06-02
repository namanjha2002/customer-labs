const Account = require('../model/account');
const Destination = require('../model/destination');
const axios = require('axios');

exports.handleIncomingData = async (req, res) => {
  const token = req.header('CL-X-TOKEN');
  const data = req.body;

  // Check for token
  if (!token) return res.status(401).json({ message: 'Un Authenticate' });

  // Check that data is JSON
  if (!req.is('application/json') || typeof data !== 'object') {
    return res.status(400).json({ message: 'Invalid Data' });
  }

  try {
    const account = await Account.findOne({ appSecretToken: token });
    if (!account) return res.status(401).json({ message: 'Un Authenticate' });

    const destinations = await Destination.find({ accountId: account.accountId });

    await Promise.all(destinations.map(dest => sendDataToDestination(dest, data)));

    return res.json({ message: 'Data forwarded to destinations.' });
  } catch (error) {
    console.error('Error in /incoming_data:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Async helper function to send data to a single destination
const sendDataToDestination = async (dest, data) => {
  const method = dest.method.toUpperCase();
  const url = method === 'GET'
    ? `${dest.url}?${new URLSearchParams(data).toString()}`
    : dest.url;

  const config = {
    method,
    url,
    headers: dest.headers,
  };

  if (['POST', 'PUT'].includes(method)) {
    config.data = data;
  }

  try {
    const response = await axios(config);
    console.log(`✔️  Data sent to ${url} [${method}]`, response.status);
  } catch (err) {
    console.error(`❌ Failed to send to ${url}:`, err.message);
  }
};


module.exports = exports;