const Poll = require('../../../models/poll.js')

const handleGetPolls = (req, res) => {
  Poll
    .find()
    .sort({ 'pollInfo.totalVotes': -1 })
    .limit(6)
    .then((info) => {
      res.json(info)
    })
    .catch((err) => {
      console.error('poll find error', err)
      res.send(`FAIL to find most voted polls`)
    })
}

module.exports = handleGetPolls
