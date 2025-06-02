const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const accountSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  accountId: { type: String, unique: true, default: uuidv4 },
  name: { type: String, required: true },
  website: { type: String },
  appSecretToken: { type: String, default: () => crypto.randomBytes(32).toString('hex') }
});

module.exports = mongoose.model('Account', accountSchema);
