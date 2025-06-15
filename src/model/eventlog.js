const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  event_id: { type: String, unique: true, required: true },
  account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  destination_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
  received_data: { type: Object },
  received_timestamp: Date,
  processed_timestamp: Date,
  status: { type: String, enum: ['success', 'failed'], default: 'success' }
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);
