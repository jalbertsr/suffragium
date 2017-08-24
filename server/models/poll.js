const mongoose = require('mongoose')
const collection = 'poll'

const PollSchema = new mongoose.Schema({
  question: String

}, { collection })

module.exports = mongoose.model('Poll', PollSchema)
