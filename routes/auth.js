const { Router } = require('express');

const route = Router();

const asyncMiddleware = require('../middlewares/asyncMiddleware');
const authController = require('../controllers/auth');

module.exports = (app) => {
  app.use('/auth', route);

  route.post(
    '/register',
   asyncMiddleware(authController.register),
  );

  route.get(
    '/login',
    asyncMiddleware(authController.getLogin),
  );

  route.post(
    '/login',
    asyncMiddleware(authController.postLogin),
  );

  route.get(
    '/logout',
    asyncMiddleware(authController.logout),
  );
};
