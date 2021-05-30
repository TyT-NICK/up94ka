const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  to: Number,
  title: String,
  text: String,
  from: String,
  postedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Notification', userSchema);
