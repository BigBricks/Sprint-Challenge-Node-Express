const express = require("express");
const db = require('../data/helpers/projectModel');
const router = express.Router();

router.get('/', (req, res) => {
    db
    .get()
    .then(things => {
        res.status(200).json(things);
})
    .catch(err => {
        res.status(500).json({ error: 'The project information could not be retrieved.'})
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db
    .get(id)
    .then(things => {
        if (things.length === 0) {
            res.status(404).json({ message: "Id could not be found."})
        } else {
            res.json(things);
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'The project information could not be retrieved.'})
    });
}); 

router.get('/:id/actions', (req, res) => {
    const id = req.params.id;
    db
    .getProjectActions(id)
    .then(things => {
        if (things.length === 0) {
            res.status(404).json({ message: "Actions could not be found."})
        } else {
            res.json(things);
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'The project information could not be retrieved.'})
    });
}); 



router.post('/', (req, res) => {
    const { name, description } = req.body;
    const newProject = { name, description};
    if (name.length === 0 || description.length === 0 || name.length > 128 || description.length > 128 || !(typeof name === 'string') || !(typeof description === 'string')) {
        res.status(404).json({ message: "Name and Description must be a string between 1 and 128 characters."})
    } else 
    db 
    .insert(newProject)
    .then(thing => {
        res.status(201).json(thing);
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error saving the project to the database."})
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!db.get(id)) {
        res.status(404).json({ message: "project could not be found."})
    } else 
    db.remove(id)
    .then(remove => {
        res.status(201).json(remove);
    })
    .catch(err => {
        res.status(500).json({ error: "project could not be removed."})
    });
});

router.put('/:id', (req, res) => {
    const { name, description } = req.body;
    const id = req.params.id;
    if(!db.get(id)) {
        res.status(404).json({ message: "project could not be found."})
    }
    if (name.length === 0 || description.length === 0 || name.length > 128 || description.length > 128 || !(typeof name === 'string') || !(typeof description === 'string')) {
        res.status(404).json({ message: "Name and Description must be a string between 1 and 128 characters."})
    } else 
    db.update(id, req.body)
    .then(improve => {
        res.status(200).json(improve);
    })
    .catch(err => {
        res.status(500).json({  error: "The project information could not be modified." })
    });
});










module.exports = router;