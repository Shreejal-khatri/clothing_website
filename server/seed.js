const mongoose = require('mongoose');
const Item = require('./Items');
require('dotenv').config(); // Load environment variables from .env file

// Connect to MongoDB
// mongoose.connect('mongodb+srv://shreejalkhatri21:2121@cluster0.4kfac.mongodb.net/test', { 
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('Connection error:', err);
  });

// Sample items with categories
const items = [
  // { 
  //   name: 'Classic White Tee', 
  //   price: '$25.00', 
  //   description: 'A comfortable and stylish white t-shirt.', 
  //   image: 'improved_White_Tee_Men.jpg', 
  //   category: 'Men' // Added category
  // },
 { 
    name: 'Slim Fit Jeans', 
    price: '$45.00', 
    description: 'Modern slim-fit jeans for a sleek look.', 
    image: 'better_slim_jeans_men.jpg', 
    category: 'Men' // Added category
  },
  // { 
  //   name: 'Casual Blazer', 
  //   price: '$120.00', 
  //   description: 'A versatile blazer for formal and casual occasions.', 
  //   image: 'blazer.jpg', 
  //   category: 'Men' // Added category
  // },

  // { 
  //   name: 'Nike Hoodie Black', 
  //   price: '$75.00', 
  //   description: 'Classic black Nike hoodie with the iconic swoosh logo, offering style and comfort for everyday wear.', 
  //   image: 'Nike_Hoodie_White_Men.jpg', 
  //   category: 'Men' // Added category
  // },

  // { 
  //   name: 'Loose Black Jeans', 
  //   price: '$45.00', 
  //   description: 'Comfortable and stylish loose black jeans, perfect for a relaxed and casual look.', 
  //   image: 'Loose_Jeans_Men.jpg', 
  //   category: 'Men' // Added category
  // },

  // { 
  //   name: 'Plain Polo-Shirt Black', 
  //   price: '$40.00', 
  //   description: 'Classic plain polo shirt with a comfortable fit, perfect for a smart-casual look.', 
  //   image: 'Plain_Polo_Shirt_Men.jpg', 
  //   category: 'Men' // Added category
  // },

  // { 
  //   name: 'Puffed Up Jacket', 
  //   price: '$120.00', 
  //   description: 'Warm and stylish puffed-up jacket with a cozy fit, ideal for chilly weather.', 
  //   image: 'Puffed_Jacket_Men.jpg', 
  //   category: 'Men' // Added category
  // },

  // { 
  //   name: 'Puma Hoodie Black', 
  //   price: '$80.00', 
  //   description: 'Stylish black Puma hoodie with the signature logo, offering comfort and a sleek look for any casual occasion.', 
  //   image: 'Puma_Hoodie_Men.jpg', 
  //   category: 'Men' // Added category
  // },
  // { 
  //   name: 'Floral Dress', 
  //   price: '$70.00', 
  //   description: 'A beautiful floral dress for summer.', 
  //   image: 'floral_dress.png', 
  //   category: 'Women' // Added a new item for Women's section
  // },

  // { 
  //   name: 'Red LongSleve Dress', 
  //   price: '$85.00', 
  //   description: 'A beautiful Red colored dress for Spring.', 
  //   image: 'Red_Long.jpg', 
  //   category: 'Women' // Added a new item for Women's section
  // },
  // { 
  //   name: 'Tulle Square Dress Drape', 
  //   price: '$120.00', 
  //   description: 'Tulle Square Neck Bubble Sleeve Dress Drape Stretch Wrap Skirt Material : 90% Rayon, 9% Nylon & 1% Spandex. Type : Straight Skirt. Season : Summer. Style : Sexy. Collar Type : V-Necked. Pattern : None. Waist Type : High-Waisted. Sleeve Type : Sleeveless. Long : Medium. Front Fly : Zipper. Color : Picture. Suitable for : Middle-Aged. Occasion : Party. Sizes : Xs, S M, L. Hello dear, thanks for your visiting our products. The brand EXBECT was founded in 2012. We are a professional manufacturer', 
  //   image: 'Tulle_Square_Dress_Drape.jpg', 
  //   category: 'Women' // Added a new item for Women's section
  // }

  // { 
  //   name: 'Black Blazer', 
  //   price: '$99.00', 
  //   description: 'A semi-formal blazer for all ocassions.', 
  //   image: 'Blazer_coat.jpg', 
  //   category: 'Women' // Added a new item for Women's section
  // },

  // { 
  //   name: 'Crepe Wedding Gown', 
  //   price: '$100.00', 
  //   description: 'Chic and elegant dress with delicate lace accents, perfect for any wedding celebration.', 
  //   image: 'Crepe_Wedding_Gown.jpg', 
  //   category: 'Women' // Added a new item for Women's section
  // },

  //   { 
  //   name: 'White Rehearsal Dinner Dress', 
  //   price: '$45.00', 
  //   description: 'While all eyes will be on the bride on her wedding day', 
  //   image: 'White_Rehearsal_Dinner_Dress.jpg', 
  //   category: 'Women' // Added a new item for Women's section
  // },

  // { 
  //   name: 'Hazel Blue Jeans', 
  //   price: '$45.00', 
  //   description: 'Mid-Rise Waist Skinny Jeans with Pockets are a versatile and essential piece for any wardrobe. With a flattering mid-rise waist and slimming skinny fit, these jeans create a sleek and stylish look. ', 
  //   image: 'Hazel_Blues_Jeans.jpg', 
  //   category: 'Women' // Added a new item for Women's section
  // },

  // { 
  //   name: 'White Fox T-shirt', 
  //   price: '$70.00', 
  //   description: 'Classic white fox t-shirt with a comfortable fit, perfect for everyday wear.', 
  //   image: 'white_woman_tshirt.jpg', 
  //   category: 'Women' // Added a new item for Women's section
  // },
];

// Insert items into the database
Item.insertMany(items)
  .then(() => {
    console.log('Items seeded successfully');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error seeding items:', error);
    mongoose.connection.close();
  });
