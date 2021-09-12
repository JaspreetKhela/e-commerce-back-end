// Import the sequelize npm package
const { Model, DataTypes } = require('sequelize');

// Import the database package
const sequelize = require('../config/connection.js');

// Initialize Tag model (table) by extending it off Sequelize's Model class
class Tag extends Model {}

Tag.init(
  {
    // Define the model's columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

// Export the Tag model
module.exports = Tag;
