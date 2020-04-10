const express = require('express');
const Projects = require('../data/helpers/projectModel');

const router = express.Router();

router.use(express.json());


router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        console.log(err, err.message)
        res.status(500).json({message: 'Error with deleting project'})
    })
})

router.get('/:id', validateProjectId, (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err, err.message)
        res.status(500).json({message: 'Error with deleting project'})
    })
})

router.get('/:id/actions', validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err, err.message)
        res.status(500).json({message: 'Error with deleting project'})
    })
})

router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err, err.message)
        res.status(500).json({message: 'Error with deleting project'})
    })
})

router.put('/:id', validateProject, validateProjectId, (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err, err.message)
        res.status(500).json({message: 'Error with deleting project'})
    })
})

router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err, err.message)
        res.status(500).json({message: 'Error with deleting project'})
    })
})

function validateProjectId(req, res, next) {
    if (req.params.id) {
        req.project = req.params.id;
        next();
    } else {
        res.status(400).json({message: 'Error: ID not valid'})
    }
}

function validateProject(req, res, next) {
    if (!req.body.description || !req.body.name ) {
        res.status(400).json({message: 'Error: description and name not provided'});
    } else {
        next();
    }
}


module.exports = router;