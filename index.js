const config = require("dotenv");
const express = require("express");
const cors = require("cors");
const adminRouter = require("./routes/admin.routes.js");
const commonRouter = require("./routes/common.routes.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConnection.js");

const app = express();

var corsOptions = {
  origin: "http://localhost:7001",
};

app.use(cors(corsOptions));

const port = process.env.PORT || 3000;
config.config();
// app.use(express.json());
// app.use(express.urlencoded({ limit: "10mb", extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin", adminRouter);
app.use("/api", commonRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
