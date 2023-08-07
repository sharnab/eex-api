const envconfig = require("dotenv");
envconfig.config();

const config = {
  db: {
    url: `${process.env.DB_HOST}:${process.env.DB_PORT}`,
    name: `${process.env.DB_NAME}`,
  },
};

module.exports = config;
