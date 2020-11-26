const mongoose = require("mongoose");
const ScheduleSchema = new mongoose.Schema({
  title: String,
  description: String,
});
module.exports = mongoose.model("Schedule", ScheduleSchema);
