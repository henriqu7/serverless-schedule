const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  guest_limit: Number,
  room_number: Number,
  details: String,
  price: Number,
  status: Boolean,
});
module.exports = mongoose.model("Room", RoomSchema);
