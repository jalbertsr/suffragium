const checkVote = (req, res, next) => {

  /* ------------------ COOKIE VERSION ---------------------- */
  const { pollId } = req.params
  console.log('middleware before voting', req.session.votes)
  if (req.session.votes.includes(pollId)) res.status(500).send({ error: 'Already voted!' })
  else next()

  /* ------------------ IP VERSION --------------------------*/

}

module.exports = checkVote
