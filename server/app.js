const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

const routes = require('./routes/')

const urlDb = 'mongodb://localhost:27017/polls'
const PORT = process.env.PORT || 3002

const pathPublic = path.join(process.cwd(), 'client')
mongoose.Promise = Promise
mongoose.connect(urlDb, { useMongoClient: true })

app.use(express.static(pathPublic))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(routes)

const server = app.listen(PORT)
var io = require('socket.io').listen(server)

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' })
  socket.on('newVote', (data) => console.log(data))
  socket.broadcast.emit('totalVote', {votes: 30})
  socket.on('my other event', function (data) {
    console.log(data)
  })
})

console.log(`Listening on PORT ${PORT}`)
