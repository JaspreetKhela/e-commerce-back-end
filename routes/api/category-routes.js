// Create an instance of an Express.js router
const router = require('express').Router();

// Import Category and Product models
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Find and return all category data from the database
router.get('/', (req, res) => {
  Category.findAll({
    // Include data from the Product model
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"]
      }
    ]
  })
    .then(dbCategoryData => 
      // Respond with all of the category data
      res.json(dbCategoryData))
    .catch(err => {
      // Log the error to the console and respond with a 500 error
      console.log(err);
      res.status(500).json(err);
    });
});

// Find and return a category from the database with the provided ID
router.get('/:id', (req, res) => {
  Category.findOne({
    // Find data with the provided ID
    where: {
      id: req.params.id
    },
    // Include data from the Product model
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock"]
      }
    ]
  })
    .then(dbCategoryData => {
      // If no category with the provided ID is found, return a 404 error message
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }

      // Respond with the requested category data
      res.json(dbCategoryData)
    })
    .catch(err => {
      // Log the error to the console and respond with a 500 error
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new category in the database and return it
router.post('/', (req, res) => {
  Category.create({
    // Create a category with the requested category name
    category_name: req.body.category_name
  })
    .then(dbCategoryData => 
      // Respond with the posted category data
      res.json(dbCategoryData))
    .catch(err => {
      // Log the error to the console and respond with a 500 error
      console.log(err);
      res.status(500).json(err);
    });
});

// Update a category in the database with the provided ID
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    // Find data with the provided ID
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      // If no category with the provided ID is found, return a 404 error message
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }

      // Respond with the updated category data
      res.json(dbCategoryData)
    })
    .catch(err => {
      // Log the error to the console and respond with a 500 error
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a category in the database with the provided ID
router.delete('/:id', (req, res) => {
  Category.destroy({
    // Find data with the provided ID
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      // If no category with the provided ID is found, return a 404 error message
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }

      // Respond with the deleted category data
      res.json(dbCategoryData)
    })
    .catch(err => {
      // Log the error to the console and respond with a 500 error
      console.log(err);
      res.status(500).json(err);
    });
});

// Export router
module.exports = router;
