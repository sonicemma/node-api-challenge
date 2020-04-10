const express = require('express');
const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
    Actions.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err.message, err)
        res.status(500).json({message: 'Error with getting action'})
    })
})

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err.message, err)
        res.status(500).json({message: 'Unable to retrieve action with that id'})
    })
})

router.post('/', validateAction, (req, res) => {
    Actions.insert(req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err.message, err)
        res.status(500).json({message: 'Unable to add action'})
    })
})

router.put('/:id', validateAction, (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err.message, err)
        res.status(500).json({message: 'Error with updating action'})
    })
})

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err.message, err)
        res.status(500).json({message: 'Error with deleting action'})
    })
})

function validateAction(req, res, next) {
    if (!req.body.project_id || !req.body.description || ! req.body.notes) {
        res.status(400).json({message: `Error: provide a valid project id, description, and notes`});
    } else if (req.body.description.length > 128) {
        res.status(400).json({message: 'Error: description must be under 128 characters'});
    } else {
        next();
    }
}


module.exports = router;