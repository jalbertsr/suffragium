const User = require('../../../models/user.js')

const getUserPolls = (req, res) => {
  const { id } = req.params

  User
    .findById(id)
    .populate('ownedPolls.uid')
    // .exec((err, userPolls) => {
    //   if (err) throw err
    //   console.log(JSON.stringify(userPolls, null, 2))
    // })
    .then(userPolls => {
      console.log(userPolls)
      res.json(userPolls)
    })
    .catch(() => res.send(`FAIL to get poll owned by user w/ id ${id}`))
}

module.exports = getUserPolls
