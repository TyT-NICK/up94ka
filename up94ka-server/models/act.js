const mongoose = require('mongoose')

const actSchema = mongoose.Schema({
  number: String,
  part: Number,
  name: String,
  actVersions: [{ type: mongoose.Types.ObjectId, ref: 'ActVersion' }],
})

module.exports = mongoose.model('Act', actSchema)
