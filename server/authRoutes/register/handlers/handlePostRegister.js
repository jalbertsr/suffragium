const User = require('../../../models/user.js')

const handlePostRegister = (req, res) => {
  const { email, password } = req.body
  console.log(req.body)

  const account = new User({ email })

  User.register(account, password, err => {
    if (err) {
      return res.json({ success: false, msg: 'Username already exists.' })
    }
    res.json({ success: true, msg: 'Successful created new user.' })
  })
}

module.exports = handlePostRegister
