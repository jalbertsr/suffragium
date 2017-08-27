const Poll = require('../../../models/poll.js')

const handleUpdateStatus = (req, res) => {
  const { id, status } = req.params

  Poll
    .findByIdAndUpdate(id, {'pollInfo.status': status})
    .then(() => res.status(200))
    .catch(() => res.send(`FAIL!! Poll w/ id ${id} was NOT able to UPDATE status`))
}

module.exports = handleUpdateStatus
