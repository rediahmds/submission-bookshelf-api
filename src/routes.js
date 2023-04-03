const handlers = require('./handlers');

const routes = [
  {
    // Homepage route
    method: 'GET',
    path: '/',
    handler: handlers.home,
  },
  {
    method: 'POST',
    path: '/books',
    handler: handlers.saveBooks,
  },
];

module.exports = routes;
