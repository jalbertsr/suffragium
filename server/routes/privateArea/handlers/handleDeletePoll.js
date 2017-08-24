const Poll = require('')

function handleDeletePoll (req, res) {
  const id = req.params.id
  Poll.findByIdAndRemove(id)
    .then(() => res.redirect(''))
    .catch(() => res.send(`FAIL!! Poll w/ id ${id} was NOT removed`))
}

module.exports = handleDeletePoll
