function handlePostRegister (req, res) {
  const pollDataObject = req.body
  console.log(pollDataObject)
  res.status(200).send('form post recived')
}

module.exports = handlePostRegister
