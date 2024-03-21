const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;
app.use(cors());

// MySQL connection configuration
const db = mysql.createConnection({
  host: "database-1-codeform.cjeyeueaiy8i.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "shiv261020",
  database: "CodeForm",
  port: "3306",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database as id " + db.threadId);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/submit-form", (req, res) => {
  const { username, codeLanguage, stdin, sourceCode, timestamp } = req.body;


  const sql =
    "INSERT INTO form_data (username, code_language, stdin, source_code, timestamp) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [username, codeLanguage, stdin, sourceCode, timestamp],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error inserting data into database");
      } else {
        console.log("Data inserted into database");
        res.status(200).send("Form data submitted successfully");
        
      }
    }
  );
});

app.get("/fetch-data", (req, res) => {

  const sql = "SELECT * FROM form_data";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching data from database");
    } else {
      console.log("Data fetched from database");
      res.status(200).json(result);
    }
  });
});

app.delete('/delete-data/:id', (req, res) => {
  const id = req.params.id;

  // SQL query to delete a row with the specified ID
  const sql = 'DELETE FROM form_data WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error deleting data from database');
    } else {
      console.log('Data deleted from database');
      res.status(200).send('Row deleted successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
