// Import sequelize npm module
const { Model, DataTypes } = require('sequelize');

// Import database connection
const sequelize = require('../config/connection.js');

// Define a Category model as extended class of the Model class
class Category extends Model {}

// Define the Category model
Category.init(
  {
    // Define columns
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
