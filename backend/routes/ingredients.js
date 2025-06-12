const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', async (req, res, next) => {
  try {
    const { rows } = await db.query(`
      SELECT id as ingredient_id, ingredient_name
      FROM ingredients
      ORDER BY ingredient_name;
    `);
    
    console.log('Ingredients route returning:', rows.slice(0, 3));
    res.json({ ingredients: rows });
  } catch (err) {
    console.error('Error in ingredients route:', err);
    next(err);
  }
});

module.exports = router;