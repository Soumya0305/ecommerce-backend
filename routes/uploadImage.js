const express = require('express');
const cloudinary = require('../config/cloudinaryConfig'); // Your Cloudinary config
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Temporary storage

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    // Now you can store result.secure_url in your database
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).send('Error uploading image');
  }
});

module.exports = router;

// Don't forget to clean up the temporary file if needed
