const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');
const app = express();
const port = 3000;


// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password@123',
  database: 'mydatabase'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to the database');
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.post('/students', (req, res) => {
  const { name, email, address, profile_picture, current_school, previous_school, parent_details, assigned_teacher } = req.body;
  const student = {
    name,
    email,
    address,
    profile_picture,
    current_school,
    previous_school,
    parent_details,
    assigned_teacher
  };
  
  db.query('INSERT INTO students SET ?', student, (err, result) => {
    if (err) {
      throw err;
    }
    res.send('Student created successfully');
  });
});

app.get('/teachers', (req, res) => {
  db.query('SELECT * FROM teachers', (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.post('/teachers', (req, res) => {
  const { name, email, password } = req.body;
  const teacher = { name, email, password };
  
  db.query('INSERT INTO teachers SET ?', teacher, (err, result) => {
    if (err) {
      throw err;
    }
    res.send('Teacher created successfully');
  });
});

const upload = multer({ dest: 'uploads/' });

// Serve the HTML form
app.get('/upload', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully');
});


app.get('/data', async (req, res) => {
  try {
    const data = await fetchDataFromDatabase();
    res.json(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function fetchDataFromDatabase() {
  return new Promise((resolve, reject) => {
    // Perform database query or heavy processing here
    // If successful, resolve with the result
    // If an error occurs, reject with the error
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
