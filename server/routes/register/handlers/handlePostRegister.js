const handlePostRegister = (req, res) => {
  const registerObject = req.body
  console.log(registerObject)
  res.redirect('/#!/username')
}

module.exports = handlePostRegister
