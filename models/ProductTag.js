// Import the sequelize npm package
const { Model, DataTypes } = require('sequelize');

// Import the database connection
const sequelize = require('../config/connection.js');

// Initialize ProductTag model (table) by extending it off Sequelize's Model class
class ProductTag extends Model {}

ProductTag.init(
  {
    // Define the model's columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id"
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
        key: "id"
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'producttag',
  }
);

// Export the ProductTag model
module.exports = ProductTag;
