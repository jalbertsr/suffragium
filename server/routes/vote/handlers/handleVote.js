const Poll = require('../../../models/poll.js')

const handleVote = (req, res) => {
  const { pollId, voteIds } = req.params
  const numVoteOptions = voteIds.split('_')
  const io = req.app.locals.io

  req.session.votes.push(pollId)

  console.log('handleVote', req.session)

  for (let voteId of numVoteOptions) {
    Poll.update({ _id: pollId, 'options._id': voteId }, {$inc: {'options.$.votes': 1}})
    .catch(() => res.send(`FAIL!! Poll w/ id ${pollId} cound't update vote with id ${voteId}`))
  }

  Poll.findByIdAndUpdate(pollId, {$inc: {'pollInfo.totalVotes': 1}})
    .then(() => res.send(req.session))
    .catch(() => res.send(`FAIL!! Poll w/ id ${pollId} cound't update total votes`))

  io.emit('updateInfo', pollId)
}

module.exports = handleVote
