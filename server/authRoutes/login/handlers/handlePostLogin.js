const jwt = require('jsonwebtoken')

const handlePostLogin = (req, res) => {
  const SECRET = process.env.SECRET
  const { _id: id, username } = req.user

  const token = jwt.sign({ id, username }, SECRET)

  res.json({success: true, token: token})
}

module.exports = handlePostLogin
