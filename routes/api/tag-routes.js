// Create an instance of an Express.js router
const router = require('express').Router();

// Import Tag, Product, and ProductTag models
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Find and return all tag data from the database
router.get('/', (req, res) => {
  Tag.findAll({
    // Include data from the Product model
    include: [
      {
        model: ProductTag,
        attributes: ["id", "product_id"],
        include: {
          model: Product,
          attributes: ["id", "product_name", "price", "stock"]
        }
      }
    ]
  })
    .then(dbTagData => 
      // Respond with all of the tag data
      res.json(dbTagData))
    .catch(err => {
      // Log the error to the console and respond with a 500 error
      console.log(err);
      res.status(500).json(err);
    });
});

// Find and return a tag from the database with the provided ID
router.get('/:id', (req, res) => {
  Tag.findOne({
    // Find data with the provided ID 
    where: {
      id: req.params.id
    },
    // Include the data from the Product model
    include: [
      {
        model: ProductTag,
        attributes: ["id", "product_id"],
        include: {
          model: Product,
          attributes: ["id", "product_name", "price", "stock"]
        }
      }
    ]
  })
  .then(dbTagData => {
    // If no category with the provided ID is found, return a 404 error message
    if (!dbTagData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    // Respond with the tag data
    res.json(dbTagData);
  })
    .catch(err => {
      // Log the error to the console and respond with a 500 error
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new tag in the database and return it
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(dbTagData => 
      // Respond with the tag data
      res.json(dbTagData))
    .catch(err => {
      // Log the error to the console and respond with a 500 error
      console.log(err);
      res.status(500).json(err);
    });
});

// Update a tag in the database with the provided ID
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    // Find data with the provided ID
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      // If no category with the provided ID is found, return a 404 error message
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }

      // Respond with the tag data
      res.json(dbTagData)
    })
    .catch(err => {
      // Log the error to the console and respond with a 500 error
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a tag in the database with the provided ID
router.delete('/:id', (req, res) => {
    Tag.destroy({
    // Find data with the provided ID
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      // If no category with the provided ID is found, return a 404 error message
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }

      // Respond with the tag data
      res.json(dbTagData)
    })
    .catch(err => {
      // Log the error to the console and respond with a 500 error
      console.log(err);
      res.status(500).json(err);
    });
});

// Export the router
module.exports = router;