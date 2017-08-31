const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const collection = 'user'

const UserSchema = new mongoose.Schema({
  ownedPolls: [{
    uid: {
      type: ObjectId,
      ref: 'Poll'
    }
  }]
}, { collection })

const options = {
  usernameField: 'email',
  usernameLowerCase: true
}

UserSchema.plugin(passportLocalMongoose, (options))

module.exports = mongoose.model('User', UserSchema)
