const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const collection = 'user'

const UserSchema = new mongoose.Schema({
  email: {
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

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)
