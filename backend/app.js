const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const { environment } = require('./config');
//isProduction will be true if environment is in production.
//Do so by checking the environment key in the configuration file (backend/config/index.js):
const isProduction = environment === 'production';

// Initialize the Express application:
const app = express();

//middleware for logging information about requests and responses:
app.use(morgan('dev'));

//middleware for parsing cookies:
app.use(cookieParser());
//for parsing JSON bodies of requests with Content-Type of "application/json":
app.use(express.json());



// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

app.use(routes); // Connect all the routes after all middlewares



module.exports = app;
