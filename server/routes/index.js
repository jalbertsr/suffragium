const express = require('express')
const router = express.Router()

const removePoll = require('./privateArea/handlers/handleDeletePoll')
const getPollInfo = require('./privateArea/handlers/handlePostInfoPoll')
const handlePostLogin = require('./login/handlers/handlePostLogin')
const handlePostRegister = require('./register/handlers/handlePostRegister')
const infoPoll = require('./infoPoll/handlers/handleInfoPoll')
const handleVote = require('./vote/handlers/handleVote')

router.put('/api/poll/:pollId/vote/:voteIds', handleVote) // middleware gordo, cookie - ip - login - etc...
router.get('/api/infoPoll/:id', infoPoll)
// route.get('/api/infoUser/:????')
router.post('/login/', handlePostLogin)
router.post('/register/', handlePostRegister)
router.post('/privateArea/', getPollInfo)

// middleware -> usuario logeado? ->  este usario le pertenece esta encuesta? -> si/no
router.delete('/privateArea/:id', removePoll)

module.exports = router
