const mongoose = require('mongoose');
const { Schema } = mongoose;

const portfolioSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account', // Reference to the Account model
    required: true
  },
  stockSymbol: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  avgPrice: {
    type: Number,
    required: true,
    default: 0 // Average buy price
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Optional: update timestamp on save
portfolioSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
