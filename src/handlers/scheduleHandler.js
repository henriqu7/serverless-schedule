"use strict";
const dotenv = require("dotenv");
dotenv.config();

const connectToDatabase = require("../lib/database");

const Schedule = require("../models/schedules");
const ScheduleRequest = require("../models/scheduleRequests");

module.exports.confirmScheduleRequest = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log(event.pathParameters.id);

  connectToDatabase().then(() => {
    ScheduleRequest.findById(event.pathParameters.id)
      .then((object) => {
        console.log(object);
        let schemaSchedule = {
          room_type: object.room_type,
          guest_contact: object.guest_contact,
          date: object.date,
          status: object.status,
        };
        Schedule.create(schemaSchedule).then((schedule) => {
          callback(null, {
            statusCode: 200,
            body: JSON.stringify(schedule),
          });
        });
      })
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: "Could not fetch the ScheduleRequest.",
        })
      );
  });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Schedule.findById(event.pathParameters.id)
      .then((object) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(object),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: "Could not fetch the note.",
        })
      );
  });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Schedule.find()
      .then((object) =>
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(object),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: "Could not fetch the Schedule.",
        })
      );
  });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Schedule.findByIdAndUpdate(
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
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: "Could not fetch the notes.",
        })
      );
  });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Schedule.findByIdAndRemove(event.pathParameters.id)
      .then((object) =>
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({
            message: "Removed note with id: " + object._id,
            note: object,
          }),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: "Could not fetch the notes.",
        })
      );
  });
};
