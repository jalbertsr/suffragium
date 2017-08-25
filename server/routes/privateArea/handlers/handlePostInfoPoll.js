// const Poll = require('../../../models/poll.js')

function handlePostInfoPoll (req, res) {
  const pollDataObject = req.body
  console.log(pollDataObject)
  res.status(200).send('form post recived')
//   let newPoll = {}

//   for(var property in pollDataObject) {
//     let temp = pollDataObject[property]

//    // you can get the value like this: myObject[propertyName]
// }

//   console.log(lenOptions)
//   const poll = new Poll({ })

//   poll.save()
//     .then(() => res.redirect(''))
//     .catch(() => res.send(`FAIL to add poll w/ `))
  // res.redirect('')
}

module.exports = handlePostInfoPoll
