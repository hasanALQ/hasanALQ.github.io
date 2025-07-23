const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

// PostgreSQL connection settings
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'HASANBANANA!',
  port: 5432,
});

// Serve static HTML and JS files
app.use(express.static(__dirname));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Route to fetch grades from PostgreSQL
app.get('/api/grades', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT first_name, last_name, assignment1, assignment2, assignment3 FROM grades
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error querying database:', err);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
