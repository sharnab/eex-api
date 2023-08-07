// const mongoose = require("mongoose");
// const config = require("./index.js");

// const CONNECTION_URL = `mongodb://${config.db.url}/${config.db.name}`;

// mongoose.set("strictQuery", false);

// mongoose.connect(CONNECTION_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose.connection.on("connected", () => {
//   console.log("Mongo has connected succesfully");
// });

// mongoose.connection.on("reconnected", () => {
//   console.log("Mongo has reconnected");
// });

// mongoose.connection.on("error", (error) => {
//   console.log("Mongo connection has an error", error);
//   mongoose.disconnect();
// });

// mongoose.connection.off("disconnected", () => {
//   console.log("Mongo connection is disconnected");
// });

// const mysql = require("mysql");
// const config = require("./index.js");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "123456",
//   database: "e_newspaper",
// });

// connection.connect();

// connection.end();

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "123456",
  DB: "e_newspaper",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
