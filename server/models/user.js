const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const collection = 'user'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  ownedPolls: [{
    uid: {
      type: ObjectId,
      ref: 'Poll'
    }
  }]
}, { collection })

module.exports = mongoose.model('User', UserSchema)
