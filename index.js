const server = require('./server');

const port = 4242;
server.listen(port, function() {
  console.log(`=== Web API Listening on http://localhost:${port} ===`);
});
