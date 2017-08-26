const Poll = require('../../../models/poll.js')

const handleVote = (req, res) => {
  const {pollId, voteIds} = req.params

  const numVoteOptions = voteIds.split('_')

  console.log(numVoteOptions)

  numVoteOptions.forEach((voteId) => {
    Poll.findByIdAndUpdate(voteId, {$inc: {votes: 1}})
    .then(() => res.status(200))
    .catch(() => res.send(`FAIL!! Poll w/ id ${pollId} cound't update vote with id ${voteId}`))
  })

  Poll.findByIdAndUpdate(pollId, {$inc: {'pollInfo.$.totalVotes': 1}})
    .then(() => res.status(200))
    .catch(() => res.send(`FAIL!! Poll w/ id ${pollId} cound't update total votes`))
}

module.exports = handleVote
