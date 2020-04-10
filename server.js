const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const server = express();

const actionsRouter = require('./Routers/actionRouter');
const projectRouter = require('./Routers/projectRouter');

server.use(express.json());
server.use(morgan('short'));
server.use(helmet());

server.use('/api/action', actionsRouter);
server.use('/api/project', projectRouter)

server.get('/', (req, res) => {
    res.send(`<h1>The server is running!</h1>`)
})

module.exports = server;