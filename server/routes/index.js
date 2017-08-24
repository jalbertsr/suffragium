const express = require('express')
const router = express.Router()

const getPollInfo = require('./privateArea/handlers/handleDeletePoll')
const removePoll = require('./privateArea/handlers/handlePostInfoPoll')

router.post('/privateArea/', getPollInfo)
router.delete('/privateArea/:id', removePoll)

module.exports = router
