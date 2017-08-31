
const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy
const jwtStrategy = require('./strategies/jwt')

const User = require('../../models/user')

passport.use(new LocalStrategy({
  usernameField: 'email'
}, User.authenticate()))

passport.use(jwtStrategy)

module.exports = passport
