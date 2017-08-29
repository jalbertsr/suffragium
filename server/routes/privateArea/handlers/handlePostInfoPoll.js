const Poll = require('../../../models/poll.js')
const User = require('../../../models/user.js')

const handlePostInfoPoll = (req, res) => {
  // count number of property 'options' in a object
  // const optionCounter = Object.keys(req.body).reduce((acc, option) => {
  //   if (/option/.test(option)) acc++
  //   return acc
  // }, 0)

  const {question, userID} = req.body

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

  const poll = new Poll(customPoll)

  const _id = poll._id

  poll.save()
    .then((info) => console.log(info))
    .catch(() => res.send(`FAIL to add poll w/ id ${_id}`))

  User
    .findByIdAndUpdate(userID, {$push: {ownedPolls: {uid: _id}}})
    .then((data) => {
      console.log('aaaaaaaaaaaa', data)
      res.redirect(`/#!/poll/${_id}`)
    })
    .catch(() => res.send(`FAIL to add the poll w/ id ${_id} to the user w/ id ${userID}`))
}

module.exports = handlePostInfoPoll
