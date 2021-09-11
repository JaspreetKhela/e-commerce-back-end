// Import models
const Product = require('./Product.js');
const Category = require('./Category.js');
const Tag = require('./Tag.js');
const ProductTag = require('./ProductTag.js');

// Products belongs to a category
Product.belongsTo(Category, {
  foreignKey: "category_id"
});

// Categories have many products
Category.hasMany(Product, {
  foreignKey: "category_id"
});

// Products belong to many tags (through ProductTag)
Product.belongsToMany(Tags, {
  through: ProductTag,
  as: "product_tag",
  foreignKey: "product_id",
  onDelete: "SET NULL"
})

// Tags belong to many products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  as: "product_tag",
  foreignKey: "tag_id",
  onDelete: "SET NULL"
});

// Export models
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
