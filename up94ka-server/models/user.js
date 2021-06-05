const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  secondName: String,
  lastName: String,
  createdAt: { type: Date, default: Date.now() },
  role: { type: Number, default: 0 },
})

module.exports = mongoose.model('User', userSchema)
