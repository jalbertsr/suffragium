const Poll = require('../../../models/poll.js')

const handleInfoPoll = (req, res) => {
  const {id} = req.params
  Poll
    .findById(id)
    .then(info => {
      res.json(info)
    })
    .catch(() => {
      res.send('info query bad search')
    })
}

module.exports = handleInfoPoll
