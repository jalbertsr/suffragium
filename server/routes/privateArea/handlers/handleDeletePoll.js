const Poll = require('../../../models/poll.js')
const handleDeletePoll = (req, res) => {
  const {id} = req.params
  Poll.findByIdAndRemove(id)
    .then(() => res.status(200))
    .catch(() => res.send(`FAIL!! Poll w/ id ${id} was NOT removed`))
}

module.exports = handleDeletePoll
