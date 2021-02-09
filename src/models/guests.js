const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
  name: String,
  room_number: Number,
  document_number: String,
  sales: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sale",
    },
  ],
  status: Boolean,
});
module.exports = mongoose.model("Guest", GuestSchema);
