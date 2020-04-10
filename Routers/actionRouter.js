const express = require('express');
const server = express();
const router = express.Router();
const Actions = require('../data/helpers/actionModel');

server.use(express.json());

router.get('/', (req, res) => {
    Actions.get()
    .then(action => {
        res.status(200).json(action)
    })
})

module.exports = router;