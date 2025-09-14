const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0 // Initial balance
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'suspended', 'closed'],
    default: 'active'
  }
});

// Create and export the model
const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
