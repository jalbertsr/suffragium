const jwt = require('jsonwebtoken')

const handlePostLogin = (req, res) => {
  const SECRET = process.env.SECRET || 'SECRET'
  const { _id: id, email } = req.user
  console.log(req.user)
  jwt.sign({ id, email }, SECRET)

  res.redirect(`/#!/username/${id}`)
}

module.exports = handlePostLogin
