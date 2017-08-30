const Poll = require('../../../models/poll.js')

const handleVote = (req, res) => {
  const {pollId, voteIds} = req.params
  const numVoteOptions = voteIds.split('_')
  const io = req.app.locals.io

  req.session.votes.push(pollId)
  req.session.counter++
  console.log('handleVote', req.session.votes)
  console.log('counter', req.session.counter)

  for (let voteId of numVoteOptions) {
    Poll.update({ _id: pollId, 'options._id': voteId }, {$inc: {'options.$.votes': 1}})
    .then(() => {
      io.emit('updateInfo', pollId)
      res.status(200)
    })
    .catch(() => res.send(`FAIL!! Poll w/ id ${pollId} cound't update vote with id ${voteId}`))
  }

  Poll.findByIdAndUpdate(pollId, {$inc: {'pollInfo.totalVotes': 1}})
    .then(() => res.status(200))
    .catch(() => res.send(`FAIL!! Poll w/ id ${pollId} cound't update total votes`))
}

module.exports = handleVote
