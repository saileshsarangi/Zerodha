const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Optional: Add role if you have admin or trader types
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});


userSchema.statics.createPassword = async function(plainPassword) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    return hash;
};

userSchema.methods.comparePassword = async function(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
};

userSchema.methods.generateAuthToken = function(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secretKey');
    return token;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
