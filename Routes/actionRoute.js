const express = require("express");
const db = require('../data/helpers/actionModel');
const router = express.Router();

router.get('/', (req, res) => {
    db
    .get()
    .then(things => {
        res.status(200).json(things);
})
    .catch(err => {
        res.status(500).json({ error: 'The action information could not be retrieved.'})
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
        res.status(500).json({ error: 'The action information could not be retrieved.'})
    });
});
//WHY DO WE NEED NOTES WHEN IT SAYS UNREQUIRED TF?????????????
router.post('/', (req, res) => {
    const {project_id, description, notes} = req.body;
    const newPost = {project_id, notes, description};
    if (notes.length === 0 || description.length === 0 || description.length > 128 || !(typeof description === 'string') || !(typeof notes === 'string')) {
        res.status(404).json({ message: "Description must be a string between 1 and 128 characters and Notes must exist in a string."})
    } else 
    db 
    .insert(newPost)
    .then(thing => {
        res.status(201).json(thing);
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error saving the action to the database."})
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!db.get(id)) {
        res.status(404).json({ message: "Action could not be found."})
    } else 
    db.remove(id)
    .then(remove => {
        res.status(201).json(remove);
    })
    .catch(err => {
        res.status(500).json({ error: "Action could not be removed."})
    });
});

router.put('/:id', (req, res) => {
    const { project_id, description, notes } = req.body;
    const id = req.params.id;
    if(!db.get(id)) {
        res.status(404).json({ message: "Action could not be found."})
    }
    if (notes.length === 0 || description.length === 0 || description.length > 128 || !(typeof description === 'string') || !(typeof notes === 'string')) {
        res.status(404).json({ message: "Description must be a string between 1 and 128 characters and Notes must exist in a string."})
    } else
    db.update(id, req.body)
    .then(improve => {
        res.status(200).json(improve);
    })
    .catch(err => {
        res.status(500).json({  error: "The action information could not be modified." })
    });
});


module.exports = router;