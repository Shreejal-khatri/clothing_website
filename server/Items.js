const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },  // Added category field
  subCategory: { type: String, required: true }, // Add subcategory field

});

// Export the model
module.exports = mongoose.model('Item', itemSchema);