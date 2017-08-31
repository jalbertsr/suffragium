const User = require('../../../models/user.js')

const handlePostRegister = (req, res) => {
  const { username, password } = req.body

  const account = new User({ username })

  const id = account._id

  User.register(account, password, err => {
    if (err) {
      return res.status(500).send('Not authorized')
    }
    res.redirect(`!#/usrname/${id}`)
  })
}

module.exports = handlePostRegister
