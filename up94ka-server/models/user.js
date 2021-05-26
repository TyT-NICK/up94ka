const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  secondName: String,
  lastName: String,
  createdAt: { type: Date, default: Date.now() },
  role: {
    isAdmin: { type: Boolean, default: false },
    isOperator: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model('User', userSchema);
