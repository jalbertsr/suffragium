const Poll = require('../../../models/poll.js')

const handleUpdateImg = (req, res) => {
  const { id } = req.params
  const { imgUrl } = req.body

  Poll.update({ _id: id }, { imgBase64: imgUrl })
    .then((msg) => res.status(200).send(msg))
    .catch((msg) => res.status(500).send(msg))
}

module.exports = handleUpdateImg
