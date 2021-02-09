const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guest",
  },
  date: Date,
  product: String,
  quantity: Number,
  total_price: Number,
  status: Boolean,
});
module.exports = mongoose.model("Sale", SaleSchema);
