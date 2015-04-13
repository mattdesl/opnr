var http = require('http')
require('getport')(function(err, port) {
  if (err) 
    throw err
  var server = http.createServer(function(req, res) {
    res.end('hello')
  })
  server.listen(port, function(err) {
    if (err)
      throw err
    console.log(JSON.stringify({ 
      url: 'localhost:'+port, 
      type: 'connect',
      message: 'server running on '+port 
    }))
  })
})