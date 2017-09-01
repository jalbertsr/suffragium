const User = require('../../../models/user.js')

const handlePostRegister = (req, res) => {
  const { email, password } = req.body

  const account = new User({ email })

  console.log('llega', account)
  const id = account._id

  User.register(account, password, err => {
    if (err) {
      res.redirect(`/register/`)
    }
    res.redirect(`/#!/username/${id}`)
  })
}

module.exports = handlePostRegister
