const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');

// MySQL connection configuration
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sysdev_recruitment',
});

app.use(express.json());

app.get('/', async (req, res) => {
  const favorite = req.query.favorite;

  if (favorite){
  try {
    // Get a connection from the pool
    const connection = await pool.promise().getConnection();

    // Perform the query
    const [result] = await connection.query('INSERT INTO programming_languages (favorites) VALUES (?)', [favorite]);

    // Release the connection
    connection.release();

    // Send response
    res.send(`Inserted favorite programming language: ${favorite}`);
  } catch (error) {
    console.error('Error inserting favorite programming language:', error);
    res.status(500).send('Error inserting favorite programming language');
  }
  }else{
    res.send(`'To Enter your favorite programming language, just insert '/?favorite=your_favorite_programming_language`);
  }
});

app.get('/programming_languages', async (req, res) => {
  try {
    const connection = await pool.promise().getConnection();
    const [rows] = await connection.query('SELECT * FROM programming_languages');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).send('Error! Something went wrong!');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});


//To run app, user the "node index.js" command

//CREATE DATABASE sysdev_recruitment;
//USE sysdev_recruitment;
//CREATE TABLE programming_languages (
//  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//  favorites VARCHAR(255)

