const checkVote = (req, res, next) => {
  const { pollId } = req.params
  if (req.session.votes.includes(pollId)) res.status(401).send({ error: 'Already voted!' })
  else next()
}

module.exports = checkVote
