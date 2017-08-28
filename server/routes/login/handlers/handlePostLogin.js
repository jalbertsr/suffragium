const handlePostLogin = (req, res) => {
  const { email, password } = req.body
  console.log(`email: ${email}, password:${password}`)
  if (email === 'user@user' && password === 'qwerty') res.redirect('/#!/username')
  else res.send('unauthorized')
}

module.exports = handlePostLogin
