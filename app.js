const express = require ('express');
const bodyParser = require ('body-parser');

const app = express ();
const {API_VERSION} = require ('./config');

// Load routings
const authRoutes = require ('./routers/auth');
const userRoutes = require ('./routers/user');
const appTemplateRoutes = require ('./routers/appTemplate');

app.use (bodyParser.urlencoded ({extended: false}));
app.use (bodyParser.json ());

// Configure Header HTTP
app.use ((req, res, next) => {
  res.header ('Access-Control-Allow-Origin', '*');
  res.header (
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  );
  res.header (
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, DELETE'
  );
  res.header ('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next ();
});

// Router Basic
app.use (`/rest/${API_VERSION}`, authRoutes);
app.use (`/rest/${API_VERSION}`, userRoutes);
app.use (`/rest/${API_VERSION}`, appTemplateRoutes);

app.use ('/apps/logos', express.static (__dirname + '/uploads/avatar'));

module.exports = app;
