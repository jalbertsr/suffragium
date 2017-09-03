const jwt = require('jsonwebtoken')

const handlePostLogin = (req, res) => {
  const SECRET = process.env.SECRET || 'SECRET'
  const { _id: id, email } = req.user
  console.log(req.user)

  const token = jwt.sign({ id, email }, SECRET)

  res.json({success: true, id: id, token: token})
}

module.exports = handlePostLogin
