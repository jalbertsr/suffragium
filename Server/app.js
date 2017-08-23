const express = require('express')
const path = require('path')
// const mongoose = require('mongoose')
const routes = require('./routes/')
const app = express()

const pathPublic = path.join(process.cwd(), 'client')
console.log(pathPublic)
const PORT = process.env.PORT || 3002
// const urlDb = process.env.urlDb || `mongodb://localhost:27017/suffragium`

app.use(express.static(pathPublic))

// mongoose.Promise = Promise
// mongoose.connect(urlDb, { useMongoClient: true })

app.use(routes)

app.listen(PORT)
console.log(`Listening on PORT ${PORT}`)
