const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', async (req, res, next) => {
  try {
    const { rows } = await db.query(`
      SELECT ingredient_name
      FROM ingredients
      ORDER BY ingredient_name;
    `);
    res.json({ ingredients: rows });
  } catch (err) {
    next(err);
  }
});

module.exports = router;