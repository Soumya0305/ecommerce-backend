const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Register User
router.post('/register', async (req, res) => {
  // Handle registration logic
  const {name, email, password} = req.body;
  
  try {
    const existingUser = await User.findOne({email});
    if(existingUser) {
      return res.status(400).json({message: "User Already Exists"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({message: "User registered successfully"})
  } catch(error) {
    console.error(error);
    res.status(500).json({message: "Server Error"})
  }


});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET, { expiresIn: '1h' });

    // Optionally, generate a token here for the user
    res.status(200).json({ message: "Login successful",  user: { name: existingUser.name, email: existingUser.email }, token: token });
  } catch (error) {
    console.error("Login error:", error.message); // Log specific error message
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
