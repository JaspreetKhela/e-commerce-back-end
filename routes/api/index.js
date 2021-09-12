// Create an instance of an Express.js router
const router = require('express').Router();

// Import the category routes
const categoryRoutes = require('./category-routes.js');

// Import the product routes
const productRoutes = require('./product-routes.js');

// Import the tag routes
const tagRoutes = require('./tag-routes.js');

// Middleware for routes
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

// Export the router
module.exports = router;