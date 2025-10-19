const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: 'localhost',      
  user: 'root',           
  password: '',           
  database: 'my_database' 
});


db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});


app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM your_table', (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Database error');
      return;
    }
    res.json(results); 
  });
});


app.post('/api/data', (req, res) => {
  const { name, age } = req.body;
  db.query(
    'INSERT INTO your_table (name, age) VALUES (?, ?)',
    [name, age],
    (err, results) => {
      if (err) {
        console.error('Error inserting into database:', err);
        res.status(500).send('Database error');
        return;
      }
      res.status(200).send('Data inserted successfully');
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});