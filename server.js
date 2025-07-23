const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

// 🔒 Replace these with your actual PostgreSQL info
const pool = new Pool({
  user: 'postgres',          // your PostgreSQL username
  host: 'localhost',
  database: 'your_db_name',  // the name of your database
  password: 'your_password', // your PostgreSQL password
  port: 5432,
});

// Serve HTML and public files
app.use(express.static(__dirname));
app.use('/public', express.static(path.join(__dirname, 'public')));

// API route to get grades
app.get('/api/grades', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT first_name, last_name, assignment1, assignment2, assignment3 FROM grades'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
