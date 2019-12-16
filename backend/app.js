const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { dbURI, port } = require('./config/environment')
const router = require('./router')
const errorHandler = require('./lib/errorHandler')
const path = require('path')
const dist = path.join(__dirname, 'dist')


// Connecting to mongoose
mongoose.connect(dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('Mongo is connected'))

// Express server
const app = express()

// Middleware
app.use(bodyParser.json())

app.use((req, resp, next) => {
  console.log(`${req.method} to ${req.url}`)
  next()
})

app.use('/api', router)

app.use(errorHandler)

app.use('/', express.static(dist))

app.get('*', function(req, res) {
  res.sendFile(path.join(dist, 'index.html'))
})

app.use('/*', (req, res) => res.status(404).json({ message: 'Not Found' }))

// Port Listening
app.listen(port, () => console.log(`We are good to go on port ${port}`))

module.exports = app