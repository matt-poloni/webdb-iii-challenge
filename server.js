const express = require('express');
const helmet = require('helmet');

const cohortsRouter = require('./api/router-cohorts');
const studentsRouter = require('./api/router-students');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/cohorts/', cohortsRouter);
server.use('/api/students/', studentsRouter);

server.use('/', (req, res) => {
  res.send("Up and running")
});

module.exports = server;
