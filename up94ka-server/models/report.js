const mongoose = require('mongoose');
const { userSchema } = require('./user');

const reportSchema = mongoose.Schema({
  text: String,
  from: userSchema,
  postedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Report', reportSchema);
