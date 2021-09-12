// Import the path module
const path = require('path')

// Import dotenv npm package
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

// Import sequelize npm package
const Sequelize = require('sequelize');

// Connect sequelize to the MySQL database
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

// Export sequelize
module.exports = sequelize;
