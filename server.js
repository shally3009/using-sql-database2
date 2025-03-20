
// Load environment variables from .env file
require('dotenv').config();

// Import required packages
const express = require('express');
const mysql = require('mysql2');

// Create an Express app
const app = express();

// Get the port from the environment variables
const port = process.env.PORT || 3000;

// Create a MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Establish MySQL connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database as id ' + db.threadId);
});

// Middleware to handle requests
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define another route to interact with MySQL (optional)
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});