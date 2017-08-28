const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
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

app.use(routes)

const server = app.listen(PORT)

const configSocket = require('./socketio/configSocket.js')

configSocket(server, app)

console.log(`Listening on PORT ${PORT}`)
