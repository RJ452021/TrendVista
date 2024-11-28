// routes/category.js
const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/add', async (req, res) => {
  try {
   
      const { name } = req.body;
      const category = new Category({ name });
      await category.save();
      res.status(201).json({ message: 'Category added successfully', category });

  } catch (error) {
    console.log("working 5");
      res.status(500).json({ error: 'Failed to add category' });
  }
});

module.exports = router;