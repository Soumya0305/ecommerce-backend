const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product'); // Adjust the path as necessary

dotenv.config();

const products = [
  {
    name: "Women's Dress",
    price: 79.99,
    description: "Elegant evening dress for women.",
    image: "https://res.cloudinary.com/dtmacyimy/image/upload/v1727673219/full-length-dress.jpg",
    stock: 15,
    category: "women",
    subcategory: "dresses",
    specifications: {
      material: "Polyester",
      dimensions: "Medium (M)"
    },
    merchant: {
      name: "Fashion Hub",
      contact: "contact@fashionhub.com",
      location: "New York, NY"
    }
  },
  {
    name: "Home Decor Wall Art",
    price: 49.99,
    description: "Beautiful wall art for home decoration.",
    image: "https://res.cloudinary.com/dtmacyimy/image/upload/v1727674279/4119986_89093_o9bffe.jpg",
    stock: 10,
    category: "homedecore",
    subcategory: "wall art",
    specifications: {
      material: "Canvas",
      dimensions: "24x36 inches"
    },
    merchant: {
      name: "Artistic Creations",
      contact: "info@artisticcreations.com",
      location: "Los Angeles, CA"
    }
  },
  {
    name: "Men's Sneakers",
    price: 89.99,
    description: "Comfortable sneakers for everyday use.",
    image: "https://res.cloudinary.com/dtmacyimy/image/upload/v1727705812/shoe_kzq.jpg",
    stock: 30,
    category: "men",
    subcategory: "footwear",
    specifications: {
      material: "Mesh",
      dimensions: "Size 10"
    },
    merchant: {
      name: "Sneaker World",
      contact: "support@sneakerworld.com",
      location: "Chicago, IL"
    }
  },
  {
    name: "Women's Handbag",
    price: 129.99,
    description: "Stylish handbag for women.",
    image: "https://res.cloudinary.com/dtmacyimy/image/upload/v1727672856/james-ree-ZmeFtu11Hpc-unsplash_aucd3i.jpg",
    stock: 20,
    category: "women",
    subcategory: "accessories",
    specifications: {
      material: "Leather",
      dimensions: "12x8x5 inches"
    },
    merchant: {
      name: "Luxury Bags",
      contact: "info@luxurybags.com",
      location: "Miami, FL"
    }
  },
  {
    name: "Modern Table Lamp",
    price: 59.99,
    description: "A stylish lamp for your living room.",
    image: "https://res.cloudinary.com/dtmacyimy/image/upload/v1727672010/joel-henry-pdIwPL3HU2s-unsplash_1_kmpyme.jpg",
    stock: 12,
    category: "homedecore",
    subcategory: "lighting",
    specifications: {
      material: "Metal",
      dimensions: "Height 18 inches"
    },
    merchant: {
      name: "Lighting Solutions",
      contact: "sales@lightingsolutions.com",
      location: "Seattle, WA"
    }
  },
  {
    name: "Men's Casual Shirt",
    price: 49.99,
    description: "Comfortable casual shirt for men.",
    image: "https://example.com/mens-casual-shirt.jpg",
    stock: 25,
    category: "men",
    subcategory: "clothing",
    specifications: {
      material: "Cotton",
      dimensions: "Large (L)"
    },
    merchant: {
      name: "Men's Fashion Store",
      contact: "info@mensfashion.com",
      location: "Austin, TX"
    }
  },
  {
    name: "Women's Sunglasses",
    price: 39.99,
    description: "Stylish sunglasses for women.",
    image: "https://example.com/womens-sunglasses.jpg",
    stock: 50,
    category: "women",
    subcategory: "accessories",
    specifications: {
      material: "Plastic",
      dimensions: "One Size"
    },
    merchant: {
      name: "Sunny Days",
      contact: "support@sunnydays.com",
      location: "San Francisco, CA"
    }
  },
  {
    name: "Boys' Graphic T-Shirt",
    price: 19.99,
    description: "Fun graphic t-shirt for boys.",
    image: "https://example.com/boys-graphic-tee.jpg",
    stock: 40,
    category: "kids",
    subcategory: "clothing",
    specifications: {
      material: "Cotton Blend",
      dimensions: "Medium (M)"
    },
    merchant: {
      name: "Kids Wear",
      contact: "contact@kidswear.com",
      location: "Dallas, TX"
    }
  },
  {
    name: "Home Office Desk",
    price: 199.99,
    description: "Modern desk for home office setup.",
    image: "https://res.cloudinary.com/dtmacyimy/image/upload/v1727888585/officedek_bfcvhv.webp",
    stock: 5,
    category: "homedecore",
    subcategory: "furniture",
    specifications: {
      material: "Wood",
      dimensions: "60x30x30 inches"
    },
    merchant: {
      name: "Office Furniture Co.",
      contact: "sales@officefurnitureco.com",
      location: "Atlanta, GA"
    }
  },
  {
    name: "Leather Wallet",
    price: 39.99,
    description: "Premium leather wallet for men.",
    image: "https://example.com/leather-wallet.jpg",
    stock: 60,
    category: "men",
    subcategory: "accessories",
    specifications: {
      material: "Genuine Leather",
      dimensions: "4x3 inches"
    },
    merchant: {
      name: "Wallet World",
      contact: "info@walletworld.com",
      location: "Boston, MA"
    }
  },
  {
    name: "Outdoor Patio Chair",
    price: 89.99,
    description: "Comfortable chair for outdoor use.",
    image: "https://res.cloudinary.com/dtmacyimy/image/upload/v1727888697/patio_chair_hwvpxy.webp",
    stock: 15,
    category: "homedecore",
    subcategory: "outdoor",
    specifications: {
      material: "Plastic",
      dimensions: "24x24x34 inches"
    },
    merchant: {
      name: "Patio Essentials",
      contact: "support@patioessentials.com",
      location: "Phoenix, AZ"
    }
  },
  {
    name: "Kids' Backpack",
    price: 29.99,
    description: "Durable backpack for school.",
    image: "https://example.com/kids-backpack.jpg",
    stock: 35,
    category: "kids",
    subcategory: "accessories",
    specifications: {
      material: "Nylon",
      dimensions: "18x12x6 inches"
    },
    merchant: {
      name: "Backpack Central",
      contact: "info@backpackcentral.com",
      location: "Orlando, FL"
    }
  },
  {
    name: "Ceramic Vase",
    price: 24.99,
    description: "Elegant ceramic vase for home decor.",
    image: "https://res.cloudinary.com/dtmacyimy/image/upload/v1727888977/shopping_tqw9je.webp",
    stock: 20,
    category: "homedecore",
    subcategory: "decor",
    specifications: {
      material: "Ceramic",
      dimensions: "10 inches"
    },
    merchant: {
      name: "Home Accents",
      contact: "info@homeaccents.com",
      location: "San Diego, CA"
    }
  },
  {
    name: "Men's Leather Jacket",
    price: 199.99,
    description: "Stylish leather jacket for men.",
    image: "https://example.com/mens-leather-jacket.jpg",
    stock: 10,
    category: "men",
    subcategory: "clothing",
    specifications: {
      material: "Genuine Leather",
      dimensions: "Large (L)"
    },
    merchant: {
      name: "Urban Styles",
      contact: "info@urbanstyles.com",
      location: "Las Vegas, NV"
    }
  },
  {
    name: "Kids' Raincoat",
    price: 34.99,
    description: "Waterproof raincoat for kids.",
    image: "https://example.com/kids-raincoat.jpg",
    stock: 25,
    category: "kids",
    subcategory: "clothing",
    specifications: {
      material: "Polyester",
      dimensions: "Various Sizes"
    },
    merchant: {
      name: "Rainy Days",
      contact: "support@rainydays.com",
      location: "Seattle, WA"
    }
  },
  {
    name: "Woven Storage Basket",
    price: 45.99,
    description: "Stylish storage solution for any room.",
    image: "https://res.cloudinary.com/dtmacyimy/image/upload/v1727889079/woven_basket_vjlgic.webp",
    stock: 30,
    category: "homedecore",
    subcategory: "decor",
    specifications: {
      material: "Wicker",
      dimensions: "18x18x12 inches"
    },
    merchant: {
      name: "Home Organization",
      contact: "info@homeorganization.com",
      location: "Denver, CO"
    }
  },
  {
    name: "Men's Swim Shorts",
    price: 39.99,
    description: "Comfortable swim shorts for summer.",
    image: "https://example.com/mens-swim-shorts.jpg",
    stock: 40,
    category: "men",
    subcategory: "swimwear",
    specifications: {
      material: "Nylon",
      dimensions: "Large (L)"
    },
    merchant: {
      name: "Swimwear Outlet",
      contact: "info@swimwearoutlet.com",
      location: "Miami, FL"
    }
  },
  {
    name: "Kids' Puzzle Game",
    price: 24.99,
    description: "Fun and educational puzzle for kids.",
    image: "https://example.com/kids-puzzle.jpg",
    stock: 50,
    category: "kids",
    subcategory: "toys",
    specifications: {
      material: "Wood",
      dimensions: "12x12 inches"
    },
    merchant: {
      name: "Toy Kingdom",
      contact: "info@toykingdom.com",
      location: "San Jose, CA"
    }
  },
  {
    name: "Indoor Plant Pot",
    price: 18.99,
    description: "Decorative pot for indoor plants.",
    image: "https://res.cloudinary.com/dtmacyimy/image/upload/v1727889231/indoor_plant_pot_bqvmtf.webp",
    stock: 55,
    category: "homedecore",
    subcategory: "decor",
    specifications: {
      material: "Ceramic",
      dimensions: "6 inches"
    },
    merchant: {
      name: "Green Thumb",
      contact: "support@greenthumb.com",
      location: "Austin, TX"
    }
  },
  {
    name: "Men's Belt",
    price: 24.99,
    description: "Classic leather belt for men.",
    image: "https://example.com/mens-belt.jpg",
    stock: 45,
    category: "men",
    subcategory: "accessories",
    specifications: {
      material: "Genuine Leather",
      dimensions: "Size 34"
    },
    merchant: {
      name: "Belt World",
      contact: "info@beltworld.com",
      location: "Houston, TX"
    }
  },
  {
    name: "Kids' Art Supplies Set",
    price: 29.99,
    description: "Complete art supplies for creative kids.",
    image: "https://example.com/art-supplies.jpg",
    stock: 60,
    category: "kids",
    subcategory: "art",
    specifications: {
      material: "Assorted",
      dimensions: "Various Sizes"
    },
    merchant: {
      name: "Creative Minds",
      contact: "info@creativeminds.com",
      location: "Orlando, FL"
    }
  },
  {
    name: "Stylish Throw Pillow",
    price: 22.99,
    description: "Decorative pillow for your sofa.",
    image: "https://res.cloudinary.com/dtmacyimy/image/upload/v1727889326/pillow_v6ct3p.jpg",
    stock: 40,
    category: "homedecore",
    subcategory: "textiles",
    specifications: {
      material: "Cotton Blend",
      dimensions: "18x18 inches"
    },
    merchant: {
      name: "Home Comforts",
      contact: "info@homecomforts.com",
      location: "Chicago, IL"
    }
  },
  {
    name: "Men's Beanie",
    price: 19.99,
    description: "Warm beanie for colder months.",
    image: "https://example.com/mens-beanie.jpg",
    stock: 50,
    category: "men",
    subcategory: "accessories",
    specifications: {
      material: "Acrylic",
      dimensions: "One Size"
    },
    merchant: {
      name: "Hat Central",
      contact: "support@hatcentral.com",
      location: "Los Angeles, CA"
    }
  }
];


module.exports = products;


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');

    // Remove existing products
    await Product.deleteMany();

    // Insert sample products
    await Product.insertMany(products);
    console.log('Sample data added successfully');

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

connectDB();
