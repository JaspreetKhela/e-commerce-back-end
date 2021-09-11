// Import the express npm package
const express = require('express');

// Import the routes folder's files
const routes = require('./routes');

// Import the sequelize connection
const sequelize = require("./config/connection");

// Create an intstance of express 
const app = express();

// Choose a server port
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use API routes in the routes directory
app.use(routes);

// Sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
