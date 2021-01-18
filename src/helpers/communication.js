module.exports.generate_whatsapp_message = (data) => {
  let message = `New Schedule Request! 

WhatsApp: ${data.personal_information.whatsapp}
Email: ${data.personal_information.email}
Nationality: ${data.personal_information.nationality}
Language: ${data.personal_information.language}
Check-in: ${data.date.checkin}
Time of Check-in:  13 pm
Check-out:  ${data.date.checkout}
Days of stay: 7 days
Room type: ${data.room_information.room_type}
Number of guests: ${data.room_information.guests}
Beds: ${data.room_information.beds}
Air-Condition: ${data.room_information.air_condition}
Ventilator: ${data.room_information.ventilator}
Type of animal: ${data.room_information.animals}
Number of animals: ${data.room_information.number_animals}`;
  return message;
};
