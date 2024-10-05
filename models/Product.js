const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String },
  stock: { type: Number, default: 0 },
  category: {
    type: String,
    enum: ['men', 'women', 'kids', 'homedecore'],
    required: true,
  },
  subcategory: { type: String, required: true },
  brand: { type: String },
  release_date: { type: Date },
  rating: { type: Number, min: 0, max: 5 },
  color: { type: String },
  specifications: {
    material: { type: String },
    dimensions: { type: String }, // Consider using a more structured format if needed
  },
  merchant: {
    name: { type: String, required: true },
    contact: { type: String }, // Optional: merchant contact information
    location: { type: String }, // Optional: merchant location
  },
});

module.exports = mongoose.model('Product', productSchema);

