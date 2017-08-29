const User = require('../../../models/user.js')

const handlePostRegister = (req, res) => {
  const {email, password} = req.body

  const newRegsiter = {
    email,
    password
  }
  const user = new User(newRegsiter)

  console.log(user)
  const id = user._id

  user.save()
    .then(() => res.redirect(`/#!/username/${id}`))
    .catch(() => res.send(`FAIL to create new user`))
}

module.exports = handlePostRegister
