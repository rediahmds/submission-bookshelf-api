const handlers = require('./handlers');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: handlers.home,
  },
];

module.exports = routes;
