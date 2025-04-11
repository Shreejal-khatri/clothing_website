
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  lastLogin: {
    type: Date,
    default: null
  },
  
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],

});

const User = mongoose.model('User', userSchema);

module.exports = User;
