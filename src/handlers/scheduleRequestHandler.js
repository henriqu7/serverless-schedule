"use strict";
const dotenv = require("dotenv");
dotenv.config();

const connectToDatabase = require("../lib/database");
const twilioClient = require("twilio")(
  process.env.TWILIO_ACCOUNT,
  process.env.TWILIO_TOKEN
);

const ScheduleRequest = require("../models/scheduleRequests");
const Room = require("../models/rooms");

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let body = JSON.parse(event.body);

  connectToDatabase().then(async () => {
    let room = await Room.findOne({
      room_number: body.room_number,
    });

    if (room.status) {
      ScheduleRequest.create(JSON.parse(event.body))
        .then((object) => {
          twilioClient.messages.create({
            body: `Hey! You have a new schedule! 
              from ${object.date.checkin} 
              to ${object.date.checkout} 
              in the room number ${object.room_number}. 
              Do you want accept? http://71ca398c7899.ngrok.io/dev/confirmschedulerequest/${object.id}`,
            from: "whatsapp:+14155238886",
            to: "whatsapp:+5511973873399",
          });
          Room.findOneAndUpdate(room.room_number, {
            status: false,
          }).then((object) => {
            callback(null, {
              statusCode: 200,
              headers: { "Content-Type": "text/plain" },
              body: JSON.stringify(object),
            });
          });
        })
        .catch((err) => {
          callback(null, {
            statusCode: err.statusCode || 500,
            headers: { "Content-Type": "text/plain" },
            body: "Could not create the schedule request.",
          });
        });
    } else {
      callback(null, {
        statusCode: 400,
        headers: { "Content-Type": "text/plain" },
        body: "Room unvailable.",
      });
    }
  });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    ScheduleRequest.findById(event.pathParameters.id)
      .then((object) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(object),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the scheduleRequest.",
        })
      );
  });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    ScheduleRequest.find()
      .then((object) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(object),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the Schedule.",
        })
      );
  });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    ScheduleRequest.findByIdAndUpdate(
      event.pathParameters.id,
      JSON.parse(event.body),
      {
        new: true,
      }
    )
      .then((object) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(object),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the schedule requests.",
        })
      );
  });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    ScheduleRequest.findByIdAndRemove(event.pathParameters.id)
      .then((object) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            message: "Removed note with id: " + object._id,
            note: object,
          }),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the schedule requests",
        })
      );
  });
};
