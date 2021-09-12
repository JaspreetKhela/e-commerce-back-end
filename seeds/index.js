// Import the seed data
const seedCategories = require('./category-seeds.js');
const seedProducts = require('./product-seeds.js');
const seedTags = require('./tag-seeds.js');
const seedProductTags = require('./product-tag-seeds.js');

// Import the database connection
const sequelize = require('../config/connection.js');

// Function for adding the seed data to the database
const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');

  await seedProductTags();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  process.exit(0);
};

// Add the seed data to the database
seedAll();