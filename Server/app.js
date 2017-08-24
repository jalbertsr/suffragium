const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
// const mongoose = require('mongoose')

// const routes = require('./routes/')

const app = express()
const PORT = process.env.PORT || 3002

const pathPublic = path.join(process.cwd(), 'client')

app.use(express.static(pathPublic))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// mongoose.Promise = Promise
// mongoose.connect(urlDb, { useMongoClient: true })

// app.use(routes)

app.listen(PORT)
console.log(`Listening on PORT ${PORT}`)
