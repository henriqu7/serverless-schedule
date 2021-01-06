"use strict";
const dotenv = require("dotenv");
dotenv.config();

const connectToDatabase = require("../lib/database");

const Sale = require("../models/sales");
const Product = require("../models/products");

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const data = JSON.parse(event.body);
  const products = data.products;

  connectToDatabase().then(() => {
    let total_price = 0;
    new Promise((resolve, reject) => {
      products.forEach((element) => {
        Product.findOne({ name: element.name }).then((object) => {
          total_price = total_price + object.price * element.quantity;
          console.log(total_price);
          resolve(total_price);
        });
      });
    })
      .then((sale) => {
        let tax_employees = (10 / 100) * sale;

        data.total_price = sale + tax_employees;
        Sale.create(data)
          .then(() => {
            products.forEach((element) => {
              console.log(element);
              Product.findOneAndUpdate(
                { name: element.name },
                {
                  $inc: { quantity: -element.quantity },
                }
              )
                .then((object) => {
                  console.log("Inserted: ", object);
                })
                .catch((err) =>
                  callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: {
                      "Access-Control-Allow-Origin": "*",
                      "Access-Control-Allow-Credentials": true,
                    },
                    body: "Could not update the product.",
                  })
                );
            });
            callback(null, {
              statusCode: 200,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
              },
              body: "Sale created",
            });
          })
          .catch((err) =>
            callback(null, {
              statusCode: err.statusCode || 500,
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
              },
              body: "Could not create the sale.",
            })
          );
      })
      .catch((err) => console.log(err));
  });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Sale.findById(event.pathParameters.id)
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
          body: "Could not fetch the sale.",
        })
      );
  });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Sale.find()
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
          body: "Could not fetch the sales.",
        })
      );
  });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Sale.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {
      new: true,
    })
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
          body: "Could not fetch the sale.",
        })
      );
  });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase().then(() => {
    Product.findByIdAndRemove(event.pathParameters.id)
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
          body: "Could not fetch the sale.",
        })
      );
  });
};
