const express = require('express');
const server = express();

server.get('/', (req, res) => {
    res.send(`<h1>The server is running!</h1>`)
})

module.exports = server;