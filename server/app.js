const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// const methodOverride = require('method-override')
// const http = require('http')
// const socket = require('socket.io')

const routes = require('./routes/')

const urlDb = 'mongodb://localhost:27017/polls'
const PORT = process.env.PORT || 3002

const app = express()
// const server = http.createServer(app)
// const io = socket.listen(server)

const pathPublic = path.join(process.cwd(), 'client')
mongoose.Promise = Promise
mongoose.connect(urlDb, { useMongoClient: true })

app.use(express.static(pathPublic))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(methodOverride('X-HTTP-Method-Override'))

app.use(routes)

app.listen(PORT)
console.log(`Listening on PORT ${PORT}`)
