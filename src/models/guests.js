const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
  name: String,
  room_number: Number,
  document: String,
});
module.exports = mongoose.model("Guest", GuestSchema);
