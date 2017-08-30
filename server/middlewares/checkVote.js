const checkVote = (req, res, next) => {
  const { pollId } = req.params
  console.log(pollId)
  console.log(req.session.votes)
  if (req.session.votes.includes(pollId)) res.status(500).send({ error: 'Already voted!' })
  else next()
}

module.exports = checkVote
