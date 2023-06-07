const express = require("express");
const bodyParser = require("body-parser"); // Require body-parser
const app = express();
app.use(bodyParser.json()); // Add body-parser middleware to parse JSON
//app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

//const cors = require("cors");
const pool = require("./db");

// Allow CORS for all routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//app.use(express.json()); //req.body

app.get("/books", async(req,res) =>{
    try {
        const result = await pool.query('SELECT * FROM book;');
        res.json(result);
    } catch (err) {
        console.error(err.message);
    }
})
app.get("/books/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM book WHERE book_id = $1',[id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})
app.post("/books", async (req, res) => {
    try {
      const { book_id,  store_id, author_id, publisher_id,  book_name, publication_year, book_price,  pages, book_quantity } = req.body;
      const result = await pool.query(
        'INSERT INTO book (book_id, store_id, author_id, publisher_id, book_name, publication_year, book_price, pages, book_quantity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [book_id, store_id, author_id, publisher_id,  book_name, publication_year, book_price,  pages, book_quantity] 
      );
      res.json(result);
    } catch (err) {
      console.error(err.message);
    }
});
app.get("/author", async(req,res) =>{
    try {
        const result = await pool.query('SELECT author_name, author_id FROM author;');
        res.json(result);
    } catch (err) {
        console.error(err.message);
    }
})
app.get("/author/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT author_name, author_id FROM author WHERE author_id = $1',[id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})
app.get("/publisher", async(req,res) =>{
    try {
        const result = await pool.query('SELECT publisher_name, publisher_id FROM publisher;');
        res.json(result);
    } catch (err) {
        console.error(err.message);
    }
})
app.get("/publisher/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT publisher_name, publisher_id FROM publisher WHERE publisher_id = $1',[id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})  
app.put("/books/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { store_id, author_id, publisher_id,  book_name, publication_year, book_price,  pages, book_quantity} = req.body;
      const result = await pool.query(
        'UPDATE book SET store_id = $1, author_id = $2, publisher_id = $3, book_name = $4, publication_year = $5, book_price = $6, pages = $7, book_quantity = $8 WHERE book_id = $9',
        [store_id, author_id, publisher_id, book_name, publication_year, book_price, pages, book_quantity, id] 
      );
      res.json("result");
    } catch (err) {
      console.error(err.message);
    }
});

app.delete("/books/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('DELETE FROM book WHERE book_id = $1',[id]);
      res.json("Book was deleted");
    } catch (err) {
      console.error(err.message);
    }
});
app.post("/query", async (req, res) => {
    try {
        const {query} = req.body;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});
app.listen(5000, () =>{
    console.log("server has started on port 5000");
});