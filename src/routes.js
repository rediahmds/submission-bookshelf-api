const handlers = require('./handlers');

const routes = [
  {
    // Homepage route
    method: 'GET',
    path: '/',
    handler: handlers.home,
  },
  {
    // Create new book(s) - Add book(s) to an array
    method: 'POST',
    path: '/books',
    handler: handlers.saveBooks,
  },
  {
    // Read all books
    method: 'GET',
    path: '/books',
    handler: handlers.getAllBooks,
  },
  {
    // Read a specific book
    method: 'GET',
    path: '/books/{id}',
    handler: handlers.getBookByID,
  },
  {
    // Update specific boook
    method: 'PUT',
    path: '/books/{id}',
    handler: handlers.updateBook,
  },
];

module.exports = routes;
