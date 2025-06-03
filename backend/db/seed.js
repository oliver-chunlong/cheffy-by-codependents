const fs = require("fs").promises;
const db = require("./connection");

const seed = async () => {
  await db.query(`DROP TABLE IF EXISTS user_favourites;`);
  await db.query(`DROP TABLE IF EXISTS user_cooked_recipes;`);
  await db.query(`DROP TABLE IF EXISTS user_dietary_restrictions;`);
  await db.query(`DROP TABLE IF EXISTS ingredient_dietary_restrictions;`);
  await db.query(`DROP TABLE IF EXISTS instructions;`);
  await db.query(`DROP TABLE IF EXISTS equipment;`);
  await db.query(`DROP TABLE IF EXISTS ingredient_quantities CASCADE;`);
  await db.query(`DROP TABLE IF EXISTS dietary_restrictions CASCADE;`);
  await db.query(`DROP TABLE IF EXISTS ingredients CASCADE;`);
  await db.query(`DROP TABLE IF EXISTS recipes CASCADE;`);
  await db.query(`DROP TABLE IF EXISTS users CASCADE;`);
  

  const schemaSql = await fs.readFile("./db/schema.sql", "utf-8");
  await db.query(schemaSql);

  const seedDataSql = await fs.readFile("./db/data/seed_test_data.sql", "utf-8");
  await db.query(seedDataSql);
};

module.exports = seed;
