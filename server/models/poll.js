const mongoose = require('mongoose')
const collection = 'poll'

const PollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [ String ],
  config: {
    duplicationChecking: {
      type: String,
      default: 'none'
    },
    allowMoreThanOne: {
      type: Boolean,
      default: false
    }
  },
  pollInfo: {
    status: {
      type: Boolean,
      default: true
    },
    votes: {
      type: Number,
      default: 0
    }
  }
  // versionKey: false
}, { collection })

// PollSchema.pre('save', function (next) {
//   email(this.email, 'Your record has changed');
//   next()
// })

module.exports = mongoose.model('Poll', PollSchema)
