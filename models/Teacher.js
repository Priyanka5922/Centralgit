// Import required modules and define Express router
const express = require('express');
const router = express.Router();

// Import Teacher model
const Teacher = require('../models/Teacher');

// Create a teacher
router.post('/teachers', (req, res) => {
  const { name, subject } = req.body;
  const newTeacher = new Teacher({ name, subject });

  newTeacher.save()
    .then(teacher => res.json(teacher))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Read all teachers
router.get('/teachers', (req, res) => {
  Teacher.find()
    .then(teachers => res.json(teachers))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Read a teacher by ID
router.get('/teachers/:id', (req, res) => {
  Teacher.findById(req.params.id)
    .then(teacher => res.json(teacher))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update a teacher
router.put('/teachers/:id', (req, res) => {
  const { name, subject } = req.body;
  Teacher.findByIdAndUpdate(req.params.id, { name, subject }, { new: true })
    .then(teacher => res.json(teacher))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Delete a teacher
router.delete('/teachers/:id', (req, res) => {
  Teacher.findByIdAndRemove(req.params.id)
    .then(() => res.json({ message: 'Teacher deleted successfully' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
