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
];

module.exports = routes;
