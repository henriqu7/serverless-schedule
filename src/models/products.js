const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  image_url: String,
  status: Boolean,
});
module.exports = mongoose.model("Product", ProductSchema);
