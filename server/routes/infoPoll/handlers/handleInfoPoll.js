const Poll = require('../../../models/poll.js')

const handleInfoPoll = (req, res) => {
  const {id} = req.params
  Poll
    .findById(id)
    .then(info => {
      res.json(info)
    })
    .catch(() => {
      res.send(`FAIL to find poll w/ ${id}`)
    })
}

module.exports = handleInfoPoll
