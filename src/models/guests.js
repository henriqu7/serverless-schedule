const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
  name: String,
  room_number: Number,
  document: String,
  sales: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sale",
    },
  ],
});
module.exports = mongoose.model("Guest", GuestSchema);
