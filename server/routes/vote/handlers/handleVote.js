const Poll = require('../../../models/poll.js')

const handleVote = (req, res) => {
  const { pollId, voteIds } = req.params
  const numVoteOptions = voteIds.split('_')
  const io = req.app.locals.io

  req.session.votes.push(pollId)

  const promises = numVoteOptions.map((voteId) => {
    return Poll.update({ _id: pollId, 'options._id': voteId }, {$inc: {'options.$.votes': 1}})
  })

  Promise
    .all(promises)
    .then(() => {
      Poll.findByIdAndUpdate(pollId, {$inc: {'pollInfo.totalVotes': 1}})
        .then(() => {
          io.emit('updateInfo', pollId)
          res.status(200).send(req.session)
        })
    })
}

module.exports = handleVote
