const Poll = require('../../../models/poll.js')

const handlePostInfoPoll = (req, res) => {
  // count number of property 'options' in a object
  // const optionCounter = Object.keys(req.body).reduce((acc, option) => {
  //   if (/option/.test(option)) acc++
  //   return acc
  // }, 0)

  const {question} = req.body
  let duplicationChecking = 'none'
  let allowMoreThanOne = false

  if (req.body.duplicationChecking) duplicationChecking = req.body.duplicationChecking
  if (req.body.allowMoreThanOne) allowMoreThanOne = true

  const options = []

  for (let key in req.body) {
    if (/option/.test(key)) {
      options.push({option: req.body[key]})
    }
  }

  const customPoll = {
    question,
    options,
    config: {
      duplicationChecking,
      allowMoreThanOne
    }
  }

  console.log('customPoll:', customPoll)

  const poll = new Poll(customPoll)

  const _id = poll._id

  poll.save()
    .then(() => res.redirect(`/#!/poll/${_id}`))
    .catch(() => res.send(`FAIL to add poll w/ id ${_id}`))
}

module.exports = handlePostInfoPoll
