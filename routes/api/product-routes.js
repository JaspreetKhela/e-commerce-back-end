// Create an instance of an Express.js router
const router = require('express').Router();

// Import the Product, Category, Tag, and ProductTag models
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Find and return all products in the database
router.get('/', (req, res) => {
  Product.findAll({
    // Include data from the Category and Tag models
    include: [
      {
        model: Category,
        attributes: ["id", "category_name"]
      },
      {
        model: Tag,
        as: "product_tag",
        attributes: ["id", "tag_name"]
      }
    ]
  })
    .then(dbProductData => 
      // Respond with all of the product data
      res.json(dbProductData))
    .catch(err => {
      // Log the error to the console and respond with a 500 error
      console.log(err);
      res.status(500).json(err);
    });
});

// Find and return a product from the database with a provided ID
router.get('/:id', (req, res) => {
  Product.findOne({
    // Find data with the provided ID
    where: {
      id: req.params.id
    },
    // Include data from the Category and Tag models
    include: [
      {
        model: Category,
        attributes: ["id", "category_name"]
      },
      {
        model: Tag,
        as: "product_tag",
        attributes: ["id", "tag_name"]
      }
    ]
  })
    .then(dbProductData => {
      // If no product with the provided ID is found, return a 404 error message
      if (!dbProductData) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }

      // Respond with the requested product data
      res.json(dbProductData)
    })
    .catch(err => {
      // Log the error to the console and respond with a 500 error
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new product in the database and then return it
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      "product_name": "Basketball",
      "price": 200.00,
      "stock": 3,
      "tagIds": [1, 2, 3, 4]
    }
  */
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    tagIds: req.body.tagIds
  })
    .then((product) => {
      // If there are product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // If there are no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      // Log the error to the console and respond with a 400 error
      console.log(err);
      res.status(400).json(err);
    });
});

// Update a product's tags then return the product in the database with a provided ID
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    // Find data with the provided ID
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // Find all of the associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // Get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // Create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // Figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => 
      // Respond with the updated product data
      res.json(updatedProductTags))
    .catch((err) => {
      // Log the error to the console and respond with a 400 error
      console.log(err);
      res.status(400).json(err);
    });
});

// Delete a product in the database with a provided ID
router.delete('/:id', (req, res) => {
  Product.destroy({
    // Find data with the provided ID
    where: {
      id: req.params.id
    }
  })
    .then(dbProductData => {
      // If no product with the provided ID is found, return a 404 error message
      if (!dbProductData) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }

      // Respond with the deleted product data
      res.json(dbProductData)
    })
    .catch(err => {
      // Log the error to the console and respond with a 500 error
      console.log(err);
      res.status(500).json(err);
    });
});

// Export the router
module.exports = router;
