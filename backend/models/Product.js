const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String }, // URL to the product image
});

module.exports = mongoose.model('Product', productSchema);