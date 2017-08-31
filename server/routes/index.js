const express = require('express')
const router = express.Router()
const passport = require(__base + 'config/passport')

const removePoll = require('./privateArea/handlers/handleDeletePoll')
const getPollInfo = require('./privateArea/handlers/handlePostInfoPoll')
const updateStatus = require('./privateArea/handlers/handleUpdateStatus')
const getUserPolls = require('./privateArea/handlers/handleUserPolls')
const handlelogin = require('./login/handlers/handlePostLogin')
const handlePostRegister = require('./register/handlers/handlePostRegister')
const infoPoll = require('./infoPoll/handlers/handleInfoPoll')
const handleVote = require('./vote/handlers/handleVote')
const getPolls = require('./home/handlers/handleGetPolls')
const checkVote = require('../middlewares/checkVote')

router.put('/api/poll/:pollId/vote/:voteIds', checkVote, handleVote) // middleware gordo, cookie - ip - login - etc...
router.get('/api/infoPoll/:id', infoPoll)
router.get('/api/getPolls/', getPolls)
router.get('/api/infoUser/:id', getUserPolls)
router.post('/login/', passport.authenticate('local', {session: false}), handlelogin)
router.post('/register/', handlePostRegister)
router.post('/privateArea/', getPollInfo)

// middleware -> usuario logeado? ->  este usario le pertenece esta encuesta? -> si/no
router.delete('/api/privateArea/:id', removePoll)
router.put('/api/privateArea/:id/:status', updateStatus)

module.exports = router
