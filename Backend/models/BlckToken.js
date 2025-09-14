const mongoose = require('mongoose');
const { Schema } = mongoose;

const blacklistedTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  blacklistedAt: {
    type: Date,
    default: Date.now,
    expires: 30 // TTL in seconds
  }
});

// The 'expires' field automatically removes the document 30 seconds after 'blacklistedAt'

const BlacklistedToken = mongoose.model('BlacklistedToken', blacklistedTokenSchema);

module.exports = BlacklistedToken;
