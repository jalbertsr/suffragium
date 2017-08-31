const User = require('../../../models/user.js')

const handlePostRegister = (req, res) => {
  const { email, password } = req.body

  const account = new User({ email })

  User.register(account, password, err => {
    if (err) {
      return res.json({succes: false, msg: 'Username already exists.'})
    }
    res.json({succes: true, msg: 'Succesful created new user.'})
  })
}

module.exports = handlePostRegister
