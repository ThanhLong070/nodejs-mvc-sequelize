const dotenv = require('dotenv');
const path = require('path');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const session = require('express-session');

dotenv.config({
  path: path.resolve(__dirname, `./env/.env`)
});

const express = require('express');

//Logger
const Logger = require('./loaders/logger');

async function startServer() {
  const app = express();
  // cookie
  app.use(cookieParser());
  app.use(session({
      key: 'nodeMvc',
      secret: 'nodeMvc',
      resave: false,
      saveUninitialized: false,
      cookie: {
          expires: 60 * 60 * 24 * 365
      }
  }));
  app.use((req, res, next) => {
    if (req.cookies.nodeMvc && !req.session.user) {
        res.clearCookie('nodeMvc');
    }
    next();
  });

  // static
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(__dirname + '/'));
  app.use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    })
  );

  await require('./loaders')(app);

  const port = process.env.PORT || 7000;

  app.listen(port, err => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }

    Logger.success(`
      ################################################
      🛡️  Server listening on port: ${port} 🛡️ 
      ################################################
    `);
  });
}

startServer();
