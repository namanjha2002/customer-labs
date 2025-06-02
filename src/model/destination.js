const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  accountId: { type: String, required: true },
  url: { type: String, required: true },
  method: { type: String, required: true, enum: ['GET', 'POST', 'PUT'] },
  headers: { type: Object, required: true }
});

module.exports = mongoose.model('Destination', destinationSchema);
