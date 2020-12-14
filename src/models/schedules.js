const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  room_type: String,
  date: {
    checkin: Date,
    checkout: Date,
  },
  guests: Number,
  status: Boolean,
  guest_contact: String,
});
module.exports = mongoose.model("Schedule", ScheduleSchema);
