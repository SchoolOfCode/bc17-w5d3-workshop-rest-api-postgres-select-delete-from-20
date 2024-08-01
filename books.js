// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getBooks() {
  // Query the database and return all books

  // Define the SQL query to fetch all books from the 'books' table
  const queryText = "SELECT * FROM books";

  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);

  // The rows property of the result object contains the retrieved records
  return result.rows;
}

export async function getBookById(id) {
  // Query the database and return the book with a matching id or null

  // Define the SQL query to fetch the book with the specified id from the 'books' table
  const queryText = "SELECT * FROM books WHERE id = $1";

  // Use the pool object to send the query to the database
  // passing the id as a parameter to prevent SQL injection
  const result = await pool.query(queryText, [id]);

  // The rows property of the result object contains the retrieved records
  // If a book with the specified id exists, it will be the first element in the rows array
  // If no book exists with the specified id, the rows array will be empty
  return result.rows[0] || null;
}

export async function createBook(book) {
  // Query the database to create a book and return the newly created book
  // Query the database and return the book with a matching id or null

  // Define the SQL query to fetch the book with the specified id from the 'books' table
  const newBook = {
    ...book
  }
  const queryText = "INSERT INTO books (title, published_date, author_id) VALUES ($1, $2, $3)";

  // Use the pool object to send the query to the database
  // passing the id as a parameter to prevent SQL injection
  const result = await pool.query(queryText, [newBook.title, newBook.published_date, newBook.author_id]);

  // The rows property of the result object contains the retrieved records
  // If a book with the specified id exists, it will be the first element in the rows array
  // If no book exists with the specified id, the rows array will be empty
  return result || null;
}

export async function updateBookById(id, updates) {
  // Query the database to update a book and return the newly updated book or null
  // Capture passed in updated in an object
  const updatedBook = {
    ...updates
  };
  // Query to pass in to update a book
  const queryText = "UPDATE books SET title = $1, published_date = $2, author_id = $3 WHERE id = $4";

  // Pass updated fields and ID to pool object to update the database
  const result = await pool.query(queryText, [updatedBook.title, updatedBook.published_date, updatedBook.author_id, id]);

  // return the result or null if there is an error
  return result || null;
}

export async function deleteBookById(id) {
  // Query the database to delete a book and return the deleted book or null
}
