const Poll = require('../../../models/poll.js')

const handleGetPolls = (req, res) => {
/* --- ERROR ---- */

  Poll
    .find()
    .limit(6)
    .then((info) => res.json(info))
    .catch(res.send(`FAIL to find most voted polls`))
}

module.exports = handleGetPolls
