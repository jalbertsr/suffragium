const Poll = require('')

function handlePostInfoPoll (req, res) {
  const [question] = [Object.keys(req.body)]
  // const {question, op} =
  console.log(aPollKeys)
  const poll = new Poll({ })

  poll.save()
    .then(() => res.redirect(''))
    .catch(() => res.send(`FAIL to add poll w/ id ${}`))
  // res.redirect('')
}

module.exports = handlePostInfoPoll
