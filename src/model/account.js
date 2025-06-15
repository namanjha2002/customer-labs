const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  account_name: { type: String, required: true },
  app_secret_token: { type: String, required: true },
  website: String,
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);
