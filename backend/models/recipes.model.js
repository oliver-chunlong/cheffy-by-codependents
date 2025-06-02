const db = require('../db');

const selectRecipes = () => {
  return db.query('SELECT * FROM recipes').then((result) => result.rows);
};

module.exports = { selectRecipes };