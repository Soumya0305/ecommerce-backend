const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};
  const products = await Product.find(filter);
  res.json(products);
});

// Add a product (admin only)
router.post('/', async (req, res) => {
  // Handle adding products
});

router.get('/:id', async (req, res) => {
 try { const productId = req.params.id;
  const product = await Product.findById(productId);

  if(!product){
    return res.status(404).json({message: "Product not found"});
  }
  res.json(product);
}
catch(error) {
console.error(error);
res.status(500).json({message : "Server Error"});
}
})

module.exports = router;
