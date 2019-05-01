const express = require('express');
const helmet = require('helmet');

// const router = require('./api/router');

const server = express();

server.use(helmet());
server.use(express.json());

// server.use('/api/route/', router);

server.use('/', (req, res) => {
  res.send("Up and running")
});

module.exports = server;
