const { Router } = require('express');

const route = Router();

const asyncMiddleware = require('../middlewares/asyncMiddleware');
const checkLogin = require('../middlewares/checkLogin');
const homeController = require('../controllers/home');

module.exports = (app) => {
  app.use('/', route);

  route.get(
    '/',
   checkLogin,
   asyncMiddleware(homeController.index),
  );
};
