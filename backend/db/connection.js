const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({ path: `${__dirname}/../.env.${ENV}` });
console.log(process.env);

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("No PGDATABASE or DATABASE_URL configured");
} else {
  console.log(`Connected to ${process.env.PGDATABASE || process.env.DATABASE_URL}`);
}

const config = {};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.ssl = { rejectUnauthorized: false };
  config.max = 2;
} else {
  config.database = process.env.PGDATABASE;
  config.ssl = false;
}

module.exports = new Pool(config);