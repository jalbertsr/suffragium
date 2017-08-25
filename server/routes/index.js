const express = require('express')
const router = express.Router()

const removePoll = require('./privateArea/handlers/handleDeletePoll')
const getPollInfo = require('./privateArea/handlers/handlePostInfoPoll')
const handlePostLogin = require('./login/handlers/handlePostLogin')
const handlePostRegister = require('./register/handlers/handlePostRegister')

router.post('/login/', handlePostLogin)
router.post('/register/', handlePostRegister)
router.post('/privateArea/', getPollInfo)
router.delete('/privateArea/:id', removePoll)

module.exports = router
