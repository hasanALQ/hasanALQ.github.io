const express = require('express');
const app = express();
const port = 3000;

// Setup PostgreSQL connection
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',       
  host: 'localhost',
  database: 'GradeBook',   
  password: 'your_password',   // replace with your DB password
  port: 5432,
});

// Serve static files (including your gradebook.html and public folder)
app.use(express.static('public'));  // adjust if your files are elsewhere

// Define route to serve grades data
app.get('/grades', async (req, res) => {
  try {
    const query = 'SELECT student_id, student_name, assignment, score, total_points FROM grades_table;'; // adjust table/columns names
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).send('Error fetching grades');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
