// Import the sequelize npm module
const { Model, DataTypes } = require('sequelize');

// Import the database connection
const sequelize = require('../config/connection.js');

// Initialize Category model (table) by extending it off Sequelize's Model class
class Category extends Model {}

// Define the Category model
Category.init(
  {
    // Define the model's columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

// Export the Category model
module.exports = Category;
