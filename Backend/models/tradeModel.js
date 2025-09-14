const mongoose = require('mongoose');
const { Schema } = mongoose;

const tradeSchema = new Schema({
  buyOrder: {
    type: Schema.Types.ObjectId,
    ref: 'Order', // Reference to the Order model
    required: true
  },
  sellOrder: {
    type: Schema.Types.ObjectId,
    ref: 'Order', // Reference to the Order model
    required: true
  },
  stockSymbol: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  tradedAt: {
    type: Date,
    default: Date.now
  }
});

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
