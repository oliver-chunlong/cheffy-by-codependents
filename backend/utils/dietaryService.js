const db = require("../db/connection");

exports.calculateDietaryFlags = async (ingredientNames) => {
  const placeholders = ingredientNames.map(() => '?').join(',');
  const sql = 
  `SELECT dr.restriction_name, 
  CASE WHEN COUNT(i.ingredient_id) = SUM(CASE WHEN idr.ingredient_id IS NOT NULL THEN 1 ELSE 0 END)
  THEN TRUE ELSE FALSE END AS is_suitable 
  FROM dietary_restrictions dr
  LEFT JOIN ingredient_dietary_restrictions idr ON dr.restriction_id = idr.restriction_id
  LEFT JOIN ingredients i ON idr.ingredient_id = i.ingredient_id AND i.ingredient_name IN (${placeholders})
  GROUP BY dr.restriction_name;`;

  const results = await db.query(sql, ingredientNames);
  
  const flags = {};
  results.forEach(row => {
    flags[row.restriction_name] = !!row.is_suitable;
  });

  return flags;
};