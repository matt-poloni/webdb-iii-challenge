const router = require('express').Router();

const tbl = 'cohorts';
const db = require('../data/helpers/basicModel')(tbl);
const dbC = require('../data/helpers/cohortsModel');
const mw = require('./middleware')(tbl);

// *** Routes at '/' ***
router.get('/', (req, res) => {
  db.get()
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not retrieve the cohorts data." });
    })
});

router.post('/', mw.has('name'), (req, res) => {
  db.post(req.body)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not create the cohort." })
    })
});

// *** Routes at '/:id' ***
router.get('/:id', (req, res) => {
  db.get(req.params.id)
    .then(cohort => {
      cohort
        ? res.status(200).json(cohort)
        : res.status(404).json({ error: "The specified ID does not exist in the cohorts database." })
    })
    .catch(err => {
      res.status(500).json({ error: "Could not retrieved the cohort at the specified ID." });
    })
});

router.put('/:id', (req, res) => {
  db.put(req.params.id, req.body)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not update the cohort at the specified ID." });
    })
});

router.delete('/:id', (req, res) => {
  db.del(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not delete the cohort at the specified ID." });
    })
});

// *** Route at '/:id/students' ***
router.get('/:id/students', (req, res) => {
  dbC.getCohortStudents(req.params.id)
    .then(students => {
      !students.length
        ? res.status(404).json({ error: "The specified cohort has no students in our database." })
        : res.status(200).json(cohort)
    })
    .catch(err => {
      res.status(500).json({ error: "Could not retrieve the cohort at the specified ID." });
    })
});

module.exports = router;