const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  title: String,
  date: {
    checkin: Date,
    checkout: Date,
  },
  guests: Number,
  status: Boolean,
});
module.exports = mongoose.model("Schedule", ScheduleSchema);
