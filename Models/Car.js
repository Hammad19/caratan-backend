const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  make_name: String,
  model_name: String,
  model_type: String,
  model_color: String,
  model_year: String,
  model_mileage: String,
  model_price: String,
  model_desc: String,
  user_id: String,
  model_photo1: String,
  model_photo2: String,
  model_photo3: String,
  user_email: String,
  phone: String,
  fullname: String,
  profile_pic: String,
  model_transmission: {
    type: String,
    default: "Automatic"

  },
  model_cc: {
    type: Number,
    default: 1500
  },
  model_cylinder : {
    type: Number,
    default: 4
  },

  model_fuel: {
    type: String,
    default: "Petrol"
  
  },
  model_seat:{
    type: Number,
    default: 4
  
  },

  car_status: {
    type: String,
    default: "Available"
  },

  views: {
    type: Number,
    default: 25
  },








  
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Car', CarSchema);