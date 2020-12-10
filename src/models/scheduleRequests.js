const mongoose = require("mongoose");

const ScheduleRequestSchema = new mongoose.Schema({
  room_number: Number,
  date: {
    checkin: Date,
    checkout: Date,
  },
  status: Boolean,
});
module.exports = mongoose.model("ScheduleRequest", ScheduleRequestSchema);
