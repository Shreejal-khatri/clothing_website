const express = require('express');
const http = require('http'); //Import the 'http' module
const { Server } = require('socket.io'); 
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const axios = require('axios');
const User = require('./Users'); 
const Item = require('./Items'); 
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const app = express();
const server = http.createServer(app);
require('dotenv').config();

// const io = new Server(server);
const port = 3000;

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  },
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000 // 2 minutes
  }
});

// JWT Token generation
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Authentication middleware

const authMiddleware = async (req, res, next) => {
  // 1. Extract token from header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false,
      message: 'No token provided or malformed authorization header' 
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Find user and attach to request
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found - token invalid' 
      });
    }

    // 4. Attach user to request object
    req.user = user;
    next();
    
  } catch (err) {
    // Handle different JWT error cases
    let message = 'Authentication failed';
    
    if (err.name === 'TokenExpiredError') {
      message = 'Token expired';
    } else if (err.name === 'JsonWebTokenError') {
      message = 'Invalid token';
    }

    return res.status(401).json({ 
      success: false,
      message,
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

module.exports = authMiddleware;


//MongoDb Connection!!!
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

//RECAPTCHA VERIFICAITON
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
// Helper function to verify reCAPTCHA token
const verifyRecaptcha = async (recaptchaToken) => {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
  const response = await axios.post(url);
  return response.data.success;
};


//ADMIN SCHEMA
const adminSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  password: { 
    type: String, 
    required: true,
    minlength: 8
  },
    email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Please fill a valid email address']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
});

const Admin = mongoose.model('Admin', adminSchema);

app.post('/api/admin/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Username, email, and password are required' 
      });
    }

    // Check if username already exists
    const existingUsername = await Admin.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: 'Username already exists'
      });
    }

    // Check if email already exists
    const existingEmail = await Admin.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create new admin
    const admin = new Admin({ username, email, password: hashedPassword });

    // Save admin to the database
    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        createdAt: admin.createdAt
      }
    });
  } catch (err) {
    console.error('Admin registration error:', err);
    res.status(500).json({
      success: false,
      message: 'Error registering admin',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Find admin
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    admin.lastLogin = Date.now();
    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        lastLogin: admin.lastLogin
      }
    });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});


// Registration Endpoint (with JWT)
app.post('/register', async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    // Ensure all fields are provided
    if (!name || !email || !password || !address || !phone) {
      return res.status(400).send('All fields are required');
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ name, email, password: hashedPassword, address, phone });
    await newUser.save();

    // Generate JWT token
    const token = generateToken(newUser);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        address: newUser.address,
        phone: newUser.phone
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
});

// Login Endpoint (with JWT)
app.post('/login', async (req, res) => {
  try {
    const { email, password, recaptchaToken } = req.body;

    // Verify reCAPTCHA token (keep your existing implementation)
    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      return res.status(400).send('Invalid reCAPTCHA');
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password');
    }

    // Update the lastLogin field to the current date and time
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = generateToken(user);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        lastLogin: user.lastLogin
      }
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.post('/auth/google', async (req, res) => {
  const { token } = req.body;  // Google token sent from the frontend

  try {
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  
    });
    const payload = ticket.getPayload();  // Get the user information from Google

    // Check if the user exists in the database
    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = new User({
        name: payload.name,
        email: payload.email,
        password: '',  // No password needed for Google login
      });
      await user.save();
    }

    // Generate a JWT token for the authenticated user
    const authToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,  // Your JWT secret
      { expiresIn: '1h' }  // Set token expiration to 1 hour
    );

    // Return the JWT token to the frontend
    res.json({ token: authToken, user });

  } catch (error) {
    console.error('Google login error:', error);
    res.status(400).send('Google login failed');
  }
});


// GET all users from database
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch users from MongoDB
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// DELETE a user by ID
app.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

//fetching profile
app.get("/profile", async (req, res) => {
  try {
    const { email } = req.query; // Get email from query parameters
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send only relevant fields (exclude password)
    res.json({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user profile" });
  }
});

//updating profile
app.put("/profile", async (req, res) => {
  try {
    const { email, name, phone, address } = req.body;
    
    // Find and update the user
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, phone, address },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return updated user data (excluding password)
    res.json({
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating user profile" });
  }
});

//View by category
app.get("/api/items/category/:category/:subCategory?", async (req, res) => {
  try {
    const { category, subCategory } = req.params;

    //Build the query object
    const query = { category }; //Always filter by category
    if (subCategory) {
      query.subCategory = subCategory; //Add subcategory filter if provided
    }

    // Fetch items based on the query
    const items = await Item.find(query).lean();
    res.status(200).json(items); // Send filtered items
  } catch (err) {
    console.error("Error retrieving items:", err);
    res.status(500).json({ message: "Error retrieving items", error: err.message });
  }
});

//fetch items by id
app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id); // Fetch item by ID
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Add to favourites
app.post('/api/favourites/add', async (req, res) => {
  const { userId, itemId } = req.body; // userId = email now!

  try {
    let user = await User.findOne({ email: userId }); // Find user by email
    if (!user) {
      user = new User({ email: userId, favourites: [] }); // Create if not found
    }

    if (!user.favourites.includes(itemId)) {
      user.favourites.push(itemId);
      await user.save();
    }

    res.json({ message: 'Item added to favourites', favourites: user.favourites });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Remove from favourites

app.post('/api/favourites/remove', async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    // Find the user by email (userId)
    let user = await User.findOne({ email: userId });

    if (user) {
      // Remove the item from the user's favourites list
      user.favourites = user.favourites.filter(id => id.toString() !== itemId.toString());

      // Save the updated user document to the database
      await user.save();

      res.json({ message: 'Item removed from favourites', favourites: user.favourites });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});



// Get user's favourite items

app.get('/api/favourites/:userId', async (req, res) => {
  try {
    // Use 'email' as a string directly instead of treating it as an ObjectId
    const user = await User.findOne({ email: req.params.userId }).populate('favourites');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.favourites); // Send the favourites (populated with item details)
  } catch (error) {
    console.error("Error fetching favourites:", error); // Log the error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



// Get all items
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find().lean(); // Ensure it returns an array
    res.status(200).json(items); // Send array of items
  } catch (err) {
    console.error("Error retrieving items:", err);
    res.status(500).json({ message: "Error retrieving items", error: err.message });
  }
});


const multer = require("multer");
const path = require("path");

// Serve images from client/public/assets folder
app.use("/assets", express.static(path.join(__dirname, "..", "client", "public", "assets")));

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save files to the client/public/assets folder
    cb(null, path.join(__dirname, "..", "client", "public", "assets"));
  },
  filename: (req, file, cb) => {
    // Save the file with a unique name (timestamp + extension)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Add new item with image upload
app.post("/api/items", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Get image URL (assuming your frontend is serving static files)
    const imageUrl = `/assets/${req.file.filename}`;  // Just use the relative path here

    // Create item with the image URL
    const newItem = new Item({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      subCategory: req.body.subCategory, // Add subcategory
      image: imageUrl, // Store relative image URL
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error("Error adding item:", err);
    res.status(400).json({ message: "Error adding item", error: err.message });
  }
});

// Serve images from client/public/assets folder
app.use("/assets", express.static(path.join(__dirname, "..", "client", "public", "assets")));


//Update the Item
app.put("/api/items/:id", upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, subCategory } = req.body;
    let imageUrl = req.body.image; // Default image URL

    // If a new image is uploaded, update the image URL
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/assets/${req.file.filename}`;
    }

    // Update the item with the new or existing image URL
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        category,
        subCategory,
        image: imageUrl, // Image URL is updated
      },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found." });
    }

    res.json(updatedItem); // Return updated item with image URL
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(400).json({ message: "Error updating item", error: err.message });
  }
});



// Delete an item
app.delete("/api/items/:id", async (req, res) => {
  try {
    // Validate ID before deleting
    if (!req.params.id) {
      return res.status(400).json({ message: "Item ID is required for deletion." });
    }

    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found." });
    }

    res.json({ message: "Item deleted" }); // Confirm deletion
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(400).json({ message: "Error deleting item", error: err.message });
  }
});

app.post('/orders', authMiddleware, async (req, res) => {
  try {
    const { items, totalPrice } = req.body;
    const userId = req.user.id; // Extract userId from decoded token

    // Validate items array
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order cannot be empty." });
    }

    // Validate and parse items
    const parsedItems = items.map(item => {
      if (!item.name || !item.quantity || !item.price) {
        throw new Error("Each item must have a name, quantity, and price.");
      }

      const parsedPrice = parseFloat(item.price.toString().replace(/[^0-9.]/g, ''));
      if (isNaN(parsedPrice)) {
        throw new Error(`Invalid price value: ${item.price}`);
      }

      const parsedQuantity = parseInt(item.quantity);
      if (isNaN(parsedQuantity) || parsedQuantity < 1) {
        throw new Error(`Invalid quantity value: ${item.quantity}`);
      }

      return {
        ...item,
        price: parsedPrice,
        quantity: parsedQuantity,
      };
    });

    const calculatedTotal = totalPrice || parsedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (isNaN(calculatedTotal)) {
      throw new Error("Invalid total price.");
    }

    // Create and save the order
    const newOrder = new Order({
      userId: userId,
      items: parsedItems,
      totalPrice: calculatedTotal
    });
    await newOrder.save();

    // Update user's order list
    await User.findByIdAndUpdate(userId, { $push: { orders: newOrder._id } });

    res.status(201).json({
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error saving order:", error.message);
    res.status(500).json({ message: "Failed to place order", error: error.message });
  }
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      name: String,
      description: String,
      image: String,
      quantity: Number,
      price: Number,
      size: String,
    },
  ],
  totalPrice: Number,
  paymentStatus: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  paymentDetails: {
    transaction_uuid: String, // eSewa transaction UUID
    paymentMethod: String, // e.g., "eSewa"
    paymentDate: Date, // Timestamp of payment
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

// Update payment status after successful payment
app.post('/orders/update-payment', async (req, res) => {
  try {
    const { orderId, paymentDetails, paymentStatus } = req.body;

    if (!orderId || !paymentStatus) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // Find the order by ID and update payment status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: paymentStatus,
        paymentDetails: paymentDetails,
      },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order payment status updated successfully", order: updatedOrder });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ message: "Failed to update payment status" });
  }
});

// eSewa test credentials
const ESewaConfig = {
  merchantId: "EPAYTEST", // Test Merchant ID
  secretKey: "8gBm/:&EnhH.1/q", // Test Secret Key
  testMode: true, // Use test endpoint
};

// Generate signature for eSewa payment
const generateSignature = (data) => {
  const message = Object.keys(data)
    .map((key) => `${key}=${data[key]}`)
    .join(",");
  return crypto.createHmac("sha256", ESewaConfig.secretKey).update(message).digest("base64");
};

// Function to verify the signature
const verifySignature = (dataToSign, secretKey, receivedSignature) => {
  // Generate the signature using the data received from eSewa
  const generatedSignature = generateSignature(dataToSign, secretKey);

  // Compare the generated signature with the one received from eSewa
  return generatedSignature === receivedSignature;
};

//upon esewa success
app.post("/esewa/success", async (req, res) => {
  const { transaction_uuid, total_amount, signature } = req.body;

  // Verify signature 
  const dataToSign = `total_amount=${total_amount},transaction_uuid=${transaction_uuid}`;
  const isValidSignature = verifySignature(dataToSign, ESewaConfig.secretKey, signature);
  
  if (!isValidSignature) {
    return res.status(400).json({ message: "Invalid signature. Payment tampering detected." });
  }

  // Verify payment with eSewa API
  try {
    const verificationResponse = await axios.post(
      "https://rc-epay.esewa.com.np/api/epay/transaction/status",
      {
        merchant_id: ESewaConfig.merchantId,
        transaction_uuid: transaction_uuid,
      },
      {
        headers: {
          Authorization: `Bearer ${ESewaConfig.secretKey}`,
        },
      }
    );

    if (verificationResponse.data.status === "COMPLETE") {
      const orderId = req.body.orderId; 

      //Update the payment status via the update-payment endpoint
      const paymentData = {
        orderId,
        paymentDetails: {
          transaction_uuid: transaction_uuid,
          paymentMethod: "eSewa",
          paymentDate: new Date(),
        },
        paymentStatus: "Completed",
      };

      const response = await fetch("http://localhost:3000/orders/update-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();

      if (response.ok) {
        res.status(200).json({
          message: "Payment successful! Order placed.",
          order: result.order,
        });
      } else {
        res.status(400).json({ message: "Failed to update payment status." });
      }
    } else {
      res.status(400).json({ message: "Payment verification failed." });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Failed to verify payment." });
  }
});


// Endpoint to handle eSewa payment failure
app.post("/esewa/failure", (req, res) => {
  res.status(400).json({ message: "Payment failed. Order not placed." });
});


// Delete Order by ID
app.delete('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully", order: deletedOrder });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Failed to delete order", error: error.message });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to retrieve orders" });
  }
});

//for order status
app.get('/order/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate the userId is a proper MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    // Find all orders for this user
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 }); // Sort by newest first

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No orders found for this user'
      });
    }

    // Return the orders
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});


const handleOrder = async () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Add items to place an order.");
    return;
  }

  // Clean the prices to ensure only the numeric part is sent
  const cleanedCart = cart.map(item => ({
    ...item,
    price: parseFloat(item.price.replace(/[^\d.]/g, "")) // Remove "NPR" and other non-numeric characters
  }));

  const order = {
    items: cleanedCart,
    totalPrice: totalPrice.toFixed(2),
    date: new Date().toISOString(),
  };

  try {
    const response = await fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    
    // Handle response...
  } catch (error) {
    console.error('Error placing order:', error);
  }
};


// Item Exchange Endpoints 

const exchangeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemsOut: [{
    name: String,
    price: Number,
    condition: String,
    images: [String]
  }],
  itemsIn: [{
    name: String,
    condition: String,
    images: [String]
  }],
  notes: String,
  status: { type: String, default: 'pending' },
  date: { type: Date, default: Date.now }
});

const ExchangeRequest = mongoose.model('ExchangeRequest', exchangeSchema);

//Upload files for Item exchange
app.post("/api/upload", upload.array("images", 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    // Return full URLs
    const imageUrls = req.files.map(file => 
      `http://localhost:3000/assets/${file.filename}`
    );

    res.json(imageUrls);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "File upload failed" });
  }
});


app.post('/api/exchange', authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { itemsOut, itemsIn, notes } = req.body;
    const userId = req.user.id; // From auth middleware

    // Validate request structure
    if (!itemsOut || !itemsIn) {
      return res.status(400).json({
        code: 'MISSING_ITEMS',
        message: 'Both itemsOut and itemsIn arrays are required'
      });
    }

    // Validate itemsOut
    if (!Array.isArray(itemsOut) || itemsOut.length === 0) {
      return res.status(400).json({
        code: 'INVALID_ITEMS_OUT',
        message: 'At least one item to exchange is required'
      });
    }

    // Validate itemsIn
    if (!Array.isArray(itemsIn) || itemsIn.length === 0) {
      return res.status(400).json({
        code: 'INVALID_ITEMS_IN',
        message: 'At least one requested item is required'
      });
    }

    // Process items being exchanged
    const processedItemsOut = itemsOut.map((item, index) => {
      if (!item?.name?.trim()) {
        throw new Error(`Item ${index + 1} in itemsOut missing name`);
      }
      if (typeof item.price !== 'number' || item.price < 0) {
        throw new Error(`Invalid price for ${item.name.trim()}`);
      }
      if (!item?.condition?.trim()) {
        throw new Error(`Missing condition for ${item.name.trim()}`);
      }

      return {
        name: item.name.trim(),
        price: item.price,
        condition: item.condition.trim(),
        images: Array.isArray(item.images) ? item.images : []
      };
    });

    // Process requested items
    const processedItemsIn = itemsIn.map((item, index) => {
      if (!item?.name?.trim()) {
        throw new Error(`Item ${index + 1} in itemsIn missing name`);
      }
      if (!item?.condition?.trim()) {
        throw new Error(`Missing condition for ${item.name.trim()}`);
      }

      return {
        name: item.name.trim(),
        condition: item.condition.trim(),
        images: Array.isArray(item.images) ? item.images : []
      };
    });

    // Create exchange request
    const newRequest = new ExchangeRequest({
      userId,
      itemsOut: processedItemsOut,
      itemsIn: processedItemsIn,
      notes: notes?.trim() || '',
      status: 'pending'
    });

    // Save with transaction
    await newRequest.save({ session });
    
    // Update user's exchange history
    await User.findByIdAndUpdate(
      userId,
      { $push: { exchangeRequests: newRequest._id } },
      { session }
    );

    await session.commitTransaction();

    // Filter sensitive data from response
    const responseData = {
      _id: newRequest._id,
      status: newRequest.status,
      itemsOut: newRequest.itemsOut.map(item => ({
        name: item.name,
        condition: item.condition
      })),
      itemsIn: newRequest.itemsIn.map(item => ({
        name: item.name,
        condition: item.condition
      })),
      createdAt: newRequest.createdAt
    };

    res.status(201).json({
      success: true,
      message: 'Exchange request submitted',
      data: responseData
    });

  } catch (error) {
    await session.abortTransaction();
    
    console.error('Exchange error:', error.message);

    // Handle specific error types
    if (error.message.includes('Item') || error.message.includes('Missing')) {
      return res.status(400).json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: error.message
      });
    }

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        code: 'SCHEMA_VALIDATION',
        message: errors.join('; ')
      });
    }

    res.status(500).json({
      success: false,
      code: 'SERVER_ERROR',
      message: 'Failed to process exchange request'
    });
  } finally {
    session.endSession();
  }
});


// Get All Exchange Requests (Admin View)
app.get('/api/exchange', async (req, res) => {
  try {
    const requests = await ExchangeRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Backend: Get requests for a specific user (using query parameter)

app.get('/api/exchange-user', async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Authentication token is required' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Fetch requests for the authenticated user (from token)
    const requests = await ExchangeRequest.find({ userId });
    res.status(200).json(requests);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

//Admin does this
app.put('/api/exchange/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Validate status
    const validStatuses = ['approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status',
        message: 'Status must be either "approved" or "rejected"'
      });
    }

    // Check if request exists
    const existingRequest = await ExchangeRequest.findById(id);
    if (!existingRequest) {
      return res.status(404).json({
        success: false,
        error: 'Not found',
        message: 'Exchange request not found'
      });
    }

    // Update the request
    const updatedRequest = await ExchangeRequest.findByIdAndUpdate(
      id,
      { 
        status,
        updatedAt: Date.now() // Track when the status was updated
      },
      { new: true } // Return the updated document
    );

    res.status(200).json({
      success: true,
      message: `Request status updated to ${status}`,
      data: updatedRequest
    });

  } catch (error) {
    console.error('Error updating request status:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Delete Exchange Request
app.delete('/api/exchange/:id', async (req, res) => {
  try {
    await ExchangeRequest.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Real-time notification

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Store notifications with unique IDs
const notificationStore = new Map(); // Using Map for easy deletion

// When sending notifications
app.post("/send-notification", (req, res) => {
  const { message } = req.body;
  const notification = {
    id: Date.now(),
    message,
    timestamp: new Date()
  };
  
  notificationStore.set(notification.id, notification);
  io.emit("notification", notification);
  res.json({ success: true });
});

// When client connects
// io.on("connection", (socket) => {
//   // Send only unacknowledged notifications
//   socket.on("request-notifications", (lastSeenId) => {
//     const notifications = Array.from(notificationStore.values())
//       .filter(n => !lastSeenId || n.id > lastSeenId);
//     socket.emit("initial-notifications", notifications);
//   });
// });
// Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
//   // console.log(`Notification endpoint: POST http://localhost:${port}/notifications`);
// });

// In your server code
io.on("connection", (socket) => {
  socket.on("clear-notifications", (lastSeenId) => {
    // Mark notifications as seen in your database/store
    // For in-memory store:
    for (const [id, notification] of notificationStore) {
      if (id <= lastSeenId) {
        notificationStore.delete(id);
      }
    }
  });
});




// const notificationSchema = new mongoose.Schema({
//   message: { type: String, required: true },
//   read: { type: Boolean, default: false },
//   timestamp: { type: Date, default: Date.now },
// });

// const Notification = mongoose.model('Notification', notificationSchema);



// // Socket.io connection handler
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });

//   // Send unread notifications when client requests them
//   socket.on("request-notifications", async (userId, lastSeenId) => {
//     try {
//       const isValidId = mongoose.Types.ObjectId.isValid(lastSeenId);

//       const query = isValidId 
//         ? { _id: { $gt: lastSeenId }, read: false, userId } 
//         : { read: false, userId };

//       const notifications = await Notification.find(query)
//         .sort({ timestamp: -1 })
//         .limit(50);

//       socket.emit("initial-notifications", notifications);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   });

//   // Mark notifications as read for a specific user
//   socket.on("mark-as-read", async (userId, notificationId) => {
//     try {
//       const updatedNotification = await Notification.findOneAndUpdate(
//         { _id: notificationId, userId }, // Ensure notification belongs to user
//         { read: true },
//         { new: true }
//       );

//       socket.emit("notification-updated", updatedNotification);
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//     }
//   });

//   // Clear notifications for the current user
//   socket.on("clear-notifications", async (userId, lastClearedId) => {
//     try {
//       await Notification.updateMany(
//         { _id: { $lte: lastClearedId }, userId }, // Only clear current user's notifications
//         { $set: { read: true } }
//       );
//       console.log(`Marked notifications up to ${lastClearedId} as read for user ${userId}`);
//     } catch (error) {
//       console.error("Error clearing notifications:", error);
//     }
//   });
// });

// API endpoint to send notifications
// app.post("/send-notification", async (req, res) => {
//   try {
//     const { message } = req.body;
    
//     const notification = new Notification({
//       message,
//       read: false
//     });

//     const savedNotification = await notification.save();
    
//     // Emit to all connected clients
//     io.emit("notification", savedNotification);
    
//     res.json({ success: true, notification: savedNotification });
//   } catch (error) {
//     console.error("Error sending notification:", error);
//     res.status(500).json({ success: false, error: "Internal server error" });
//   }
// });
server.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});