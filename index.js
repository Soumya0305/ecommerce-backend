const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const imageRoutes = require('./routes/uploadImage');
const cartRoutes = require('./routes/cart');
const addressRoutes = require('./routes/address');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: ['https://ecomm-6bdd20.netlify.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // You can specify allowed methods
  credentials: true, // Enable credentials if needed
}));
app.use(express.json());

app.use('./api/uploadImage', imageRoutes);
app.use('/api/cart', cartRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/address', addressRoutes);
app.get('/test', (req, res) => {
    res.json({ message: 'Test route is working!' });
  });

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
