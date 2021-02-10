"use strict";
const dotenv = require("dotenv");
dotenv.config();

const connectToDatabase = require("../lib/database");
const twilioClient = require("twilio")(
  process.env.TWILIO_ACCOUNT,
  process.env.TWILIO_TOKEN
);

const communication = require("../helpers/communication");

const ScheduleRequest = require("../models/scheduleRequests");

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(async () => {
    ScheduleRequest.create(JSON.parse(event.body))
      .then((object) => {
        twilioClient.messages.create({
          body: communication.generate_whatsapp_message(object),
          from: "whatsapp:+14155238886",
          to: `whatsapp:${process.env.TWILIO_COCOKNOTS}`,
        });
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify(object),
        });
      })
      .catch((err) => {
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify(err),
        });
      });
  });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    ScheduleRequest.findById(event.pathParameters.id)
      .then((object) =>
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
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
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
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
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
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
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: "Could not fetch the schedule requests",
        })
      );
  });
};
