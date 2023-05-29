// Import required modules and define Express router
const express = require('express');
const router = express.Router();

// Import Student model
const Student = require('../models/Student');

// Create a student
router.post('/students', (req, res) => {
  const { name, age, grade } = req.body;
  const newStudent = new Student({ name, age, grade });

  newStudent.save()
    .then(student => res.json(student))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Read all students
router.get('/students', (req, res) => {
  Student.find()
    .then(students => res.json(students))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Read a student by ID
router.get('/students/:id', (req, res) => {
  Student.findById(req.params.id)
    .then(student => res.json(student))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update a student
router.put('/students/:id', (req, res) => {
  const { name, age, grade } = req.body;
  Student.findByIdAndUpdate(req.params.id, { name, age, grade }, { new: true })
    .then(student => res.json(student))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Delete a student
router.delete('/students/:id', (req, res) => {
  Student.findByIdAndRemove(req.params.id)
    .then(() => res.json({ message: 'Student deleted successfully' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
