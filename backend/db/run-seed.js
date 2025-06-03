const seed = require('./seed.js');
const db = require('../connection.js');

const runSeed = async () => {
  await seed();
  await db.end();
};

runSeed();
