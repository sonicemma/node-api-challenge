const express = require('express');
const server = express();
const router = express.Router();
const Projects = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
    Projects.get()
    .then(project => {
        res.status(200).json(project)
    })
})

module.exports = router;