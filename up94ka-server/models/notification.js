const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  to: { type: Number, default: 0 },
  title: String,
  text: String,
  from: { type: mongoose.Types.ObjectId, ref: 'User' },
  postedAt: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('Notification', userSchema)
