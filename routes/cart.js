const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();
const authenticationToken = require('../middleware/auth');
const Product = require('../models/Product');


router.post('/add-to-cart', authenticationToken, async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;
  
    try {
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
  
      const existingItem = cart.items.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if already in cart
      } else {
        cart.items.push({ productId, quantity: 1  }); // Add new item
      }
  
      await cart.save();
      res.status(200).json({ message: 'Product added to cart', cart: cart.items });
    } catch (error) {
      res.status(500).json({ message: 'Error adding to cart', error });
    }
  });

  router.post('/remove-from-cart', authenticationToken, async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
            const itemToRemove = cart.items.find(item => item.productId === productId);
            if (!itemToRemove) {
                return res.status(404).json({ message: 'Product not found in cart' });
            }
            cart.items = cart.items.filter(item => item.productId !== productId)

        await cart.save();
        res.status(200).json({ message: 'Product removed from cart', cart: cart.items });
    } catch (error) {
        res.status(500).json({ message: 'Error removing from cart', error });
    }
});

router.post('/update-cart-quantity', authenticationToken, async (req, res) => {
    const { productId, quantityChange } = req.body;
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const existingItem = cart.items.find(item => item.productId === productId);
        if (!existingItem) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Update the quantity
        existingItem.quantity += quantityChange;

        // Remove the item if quantity is less than or equal to zero
        if (existingItem.quantity <= 0) {
            cart.items = cart.items.filter(item => item.productId !== productId);
        }

        await cart.save();
        res.status(200).json({ message: 'Cart updated successfully', cart: cart.items });
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart', error });
    }
});

  router.get('/my-cart', authenticationToken, async(req, res) => {
    const userId = req.user.id;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Fetch product details for all items in the cart
        const items = await Promise.all(cart.items.map(async (item) => {
            const product = await Product.findById(item.productId).lean(); // Use .lean() here
            return {
                productId: item.productId,
                quantity: item.quantity,
                product: product ? {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image
                } : null
            };
        }));

        const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);

        res.status(200).json({
            totalItems,
            items
        });
    }catch (error) {
        res.status(500).json({message: 'Error fetching cart', error});

    }
  })

  module.exports = router;
  

