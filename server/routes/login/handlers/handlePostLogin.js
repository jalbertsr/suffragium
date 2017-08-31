const User = require('../../../models/user.js')
var jwt = require('jsonwebtoken')

const handlePostLogin = (req, res) => {
  const { email, password } = req.body
  console.log(`email: ${email}, password:${password}`)

  User
    .find({email: email, password: password})
    .then((user) => {
      res.redirect(`/#!/username/${user._id}`)
    })
    .catch(() => {
      res.send('unauthorized')
    })
}

module.exports = handlePostLogin
