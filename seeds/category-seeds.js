// Import the Category model
const { Category } = require('../models');

// Create the categories seed data
const categoryData = [
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Shorts',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Shoes',
  },
];

// Bulk the categories seed data
const seedCategories = () => Category.bulkCreate(categoryData);

// Export the categories seed data
module.exports = seedCategories;