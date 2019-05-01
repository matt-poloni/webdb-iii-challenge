const router = require('express').Router();

const tbl = 'students';
const db = require('../data/helpers/basicModel')(tbl);
const dbS = require('../data/helpers/studentsModel');
const mw = require('./middleware')(tbl);

router.get('/', (req, res) => {
  db.get()
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not retrieve the students data." });
    })
});

router.post('/', mw.has('name'), (req, res) => {
  db.post(req.body)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not create the student." })
    })
});

router.get('/:id', (req, res) => {
  dbS.getByID(req.params.id)
    .then(student => {
      student
        ? res.status(200).json(student)
        : res.status(404).json({ error: "The specified ID does not exist in the students database." })
    })
    .catch(err => {
      res.status(500).json({ error: "Could not retrieved the student at the specified ID." });
    })
});

router.put('/:id', (req, res) => {
  db.put(req.params.id, req.body)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not update the student at the specified ID." });
    })
});

router.delete('/:id', (req, res) => {
  db.del(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not delete the student at the specified ID." });
    })
});

module.exports = router;