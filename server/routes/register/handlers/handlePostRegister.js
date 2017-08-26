const handlePostRegister = (req, res) => {
  const pollDataObject = req.body
  console.log(pollDataObject)
  res.redirect('/#!/username')
}

module.exports = handlePostRegister
