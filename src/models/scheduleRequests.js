const mongoose = require("mongoose");

const ScheduleRequestSchema = new mongoose.Schema({
  personal_information: {
    first_name: String,
    whatsapp: String,
    email: String,
    nacionality: String,
    language: String,
  },
  date: {
    checkin: Date,
    checkout: Date,
  },
  room_information: {
    room_type: String,
    guests: Number,
    beds: Number,
    air_condition: Boolean,
    ventilator: Boolean,
    animals: Boolean,
    number_animals: Number,
  },
});
module.exports = mongoose.model("ScheduleRequest", ScheduleRequestSchema);
