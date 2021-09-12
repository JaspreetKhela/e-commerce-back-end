// Create an instance of an Express.js router
const router = require('express').Router();

// Import API routes
const apiRoutes = require('./api');

// Middleware for API routes
router.use('/api', apiRoutes);

// Middleware for undefined API routes
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

// Export the router
module.exports = router;