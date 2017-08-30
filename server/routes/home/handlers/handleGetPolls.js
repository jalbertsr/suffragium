const Poll = require('../../../models/poll.js')

const handleGetPolls = (req, res) => {
  Poll
    .find()
    .limit(6)
    .then((info) => {
      // console.info('poll find ok', info)
      res.json(info)
    })
    .catch((err) => {
      console.error('poll find error', err)
      res.send(`FAIL to find most voted polls`)
    })
}

module.exports = handleGetPolls
