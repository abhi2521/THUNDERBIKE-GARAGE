const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required']
  },
  description: String,
  spec: String,
  phone: {
    type: String,
    match: [/^\d{10}$/, 'Phone number must be 10 digits'],
    required: [true, 'Phone number is required'],
    unique: true // ✅ Ensure uniqueness
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  }
});

module.exports = mongoose.model('Product', productSchema);
