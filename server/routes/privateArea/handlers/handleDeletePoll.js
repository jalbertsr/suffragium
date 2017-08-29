const Poll = require('../../../models/poll.js')
const User = require('../../../models/user.js')

const handleDeletePoll = (req, res) => {
  const { id } = req.params

  console.log(id)

  User
    .update({}, {$pull: {ownedPolls: {uid: id}}}, { multi: true })
    .then((info) => console.log('delete reference from user confirmation', info))
    .catch(() => res.send(`FAIL poll w/ id ${id} was NOT removed from owner user reference`))

  Poll
    .findByIdAndRemove(id)
    .then(() => res.status(200))
    .catch(() => res.send(`FAIL!! Poll w/ id ${id} was NOT removed`))
}

module.exports = handleDeletePoll
