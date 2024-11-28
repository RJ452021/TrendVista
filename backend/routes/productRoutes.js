// routes/productRoutes.js
const express = require('express');
const Product = require('../models/Product');
const Category = require('../models/Category');
const router = express.Router();

// Get products by category
router.get('/category/:categoryId', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add product
router.post('/add', async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    // Validate if the category exists
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(400).json({ error: 'Category not found.' });
    }
    // Generate a random image URL
    const randomImage = `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`;
    const newProduct = new Product({
        name,
        price,
        description,
        category, // Save the category as ObjectId
        imageUrl: randomImage // Use the generated random image URL
    });
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

module.exports = router;