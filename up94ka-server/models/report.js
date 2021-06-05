const mongoose = require('mongoose')

const reportSchema = mongoose.Schema({
  text: String,
  from: { type: mongoose.Types.ObjectId, ref: 'User' },
  postedAt: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('Report', reportSchema)
