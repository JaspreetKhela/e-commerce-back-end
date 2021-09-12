// Import the tag model
const { Tag } = require('../models');

// Create the tag seed data
const tagData = [
  {
    tag_name: 'rock music',
  },
  {
    tag_name: 'pop music',
  },
  {
    tag_name: 'blue',
  },
  {
    tag_name: 'red',
  },
  {
    tag_name: 'green',
  },
  {
    tag_name: 'white',
  },
  {
    tag_name: 'gold',
  },
  {
    tag_name: 'pop culture',
  },
];

// Bulk the tag seed data
const seedTags = () => Tag.bulkCreate(tagData);

// Export the tag seed data
module.exports = seedTags;