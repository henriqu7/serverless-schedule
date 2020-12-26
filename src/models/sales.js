const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  guest_name: String,
  room_number: Number,
  quantity: Number,
  date: Date,
  products: Array,
  total_price: Number,
  status: Boolean,
});
module.exports = mongoose.model("Sale", SaleSchema);
