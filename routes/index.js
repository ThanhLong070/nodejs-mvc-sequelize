const { Router } = require('express');

const auth = require('./auth');
const home = require('./home');

module.exports = () => {
  const app = Router();
  auth(app);
  home(app);

  return app;
};
