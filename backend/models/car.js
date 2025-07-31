const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Car name is required']
  },
  brand: {
    type: String,
    required: [true, 'Brand is required']
  },
  mileage: {
    type: String,
    required: [true, 'Mileage is required']
  },
  fuelType: {
    type: String,
    required: [true, 'Fuel type is required']
  },
  transmission: {
    type: String,
    required: [true, 'Transmission type is required'] // e.g., Manual/Automatic
  },
  price: {
    type: Number,
    required: [true, 'Ex-showroom price is required']
  },
  onroadPrice: {
    type: Number,
    required: [true, 'On-road price is required']
  },
  discount: {
    type: Number,
    default: 0
  },
  finalRate: {
    type: Number,
    required: [true, 'Final rate after discount is required']
  }
});

module.exports = mongoose.model('Car', carSchema);
