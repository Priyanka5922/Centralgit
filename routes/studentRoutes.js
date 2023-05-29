router.post('/students/login', (req, res) => {
  const { username, password } = req.body;

  // Perform authentication logic, e.g., validate credentials against the database
  // ...

  // Generate JWT token
  const token = jwt.sign({ username, role: 'student' }, 'your-secret-key');

  res.json({ token });
});
