function configSocket (server, app) {
  const io = require('socket.io').listen(server)
  app.locals.io = io
  io.on('connection', (socket) => {
    socket.on('newVote', (data) => {
      console.log('vote emited:', data)
    })
  })
}

module.exports = configSocket
