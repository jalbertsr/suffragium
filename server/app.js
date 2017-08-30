const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const app = express()

const routes = require('./routes/')

const urlDb = process.env.urlDb || 'mongodb://localhost:27017/polls'
const PORT = process.env.PORT || 3002

const pathPublic = path.join(process.cwd(), 'client')
mongoose.Promise = Promise
mongoose.connect(urlDb, { useMongoClient: true })

app.use(express.static(pathPublic))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const createId = () => '_' + Math.random().toString(36).substr(2, 9)

app.use(cookieSession({
  name: 'CookieVotes',
  keys: [createId(), createId()],
  maxAge: 7 * 24 * 60 * 60 * 1000
}))

app.use((req, res, next) => {
  console.log('use middleware',req.session)
  req.session.votes = req.session.votes || []
  next()
})

app.use(routes)

const server = app.listen(PORT)

const configSocket = require('./socketio/configSocket.js')

configSocket(server, app)

console.log(`Listening on PORT ${PORT}`)
