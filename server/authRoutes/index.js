const express = require('express')
const router = express.Router()

const passport = require('../config/passport')

const handlelogin = require('./login/handlers/handlePostLogin')
const handlePostRegister = require('./register/handlers/handlePostRegister')

router.post('/login/', passport.authenticate('local', { session: false }), handlelogin)
router.post('/register/', handlePostRegister)

module.exports = router
