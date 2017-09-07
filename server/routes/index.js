const express = require('express')
const router = express.Router()

const passport = require('../config/passport')

const removePoll = require('./privateArea/handlers/handleDeletePoll')
const getPollInfo = require('./privateArea/handlers/handlePostInfoPoll')
const updateStatus = require('./privateArea/handlers/handleUpdateStatus')
const getUserPolls = require('./privateArea/handlers/handleUserPolls')
const infoPoll = require('./infoPoll/handlers/handleInfoPoll')
const handleVote = require('./vote/handlers/handleVote')
const handleUpdateImg = require('./infoPoll/handlers/handleUpdateImg')
const getPolls = require('./home/handlers/handleGetPolls')
const checkVote = require('../middlewares/checkVote')
const checkLogin = require('../middlewares/checkLogin')

router.put('/api/poll/:pollId/vote/:voteIds', checkLogin, checkVote, handleVote)
router.get('/api/infoPoll/:id', infoPoll)
router.get('/api/getPolls/', getPolls)
router.get('/api/infoUser/:id', passport.authenticate('jwt', { session: false }), getUserPolls)
router.post('/privateArea/', getPollInfo)
router.post('/api/updateImg/:id', handleUpdateImg)

router.delete('/api/privateArea/:id', passport.authenticate('jwt', { session: false }), removePoll)
router.put('/api/privateArea/:id/:status', passport.authenticate('jwt', { session: false }), updateStatus)

module.exports = router
