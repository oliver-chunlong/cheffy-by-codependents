const db = require('../db/connection.js');

const getDietTypes = async () => {
  const result = await db.query('SELECT restriction_name FROM dietary_restrictions');
  return result.rows.map(row => row.restriction_name);
};

const getAllRecipes = async () => {
  const result = await db.query('SELECT recipe_id FROM recipes');
  return result.rows.map(row => row.recipe_id);
};

const getIngredientsWithRestrictions = async (recipe_id) => {
  const ingredientsRes = await db.query(
    `
    SELECT
      ingredients.id AS ingredient_id
    FROM ingredient_quantities
    JOIN ingredients ON ingredient_quantities.ingredient_id = ingredients.id
    WHERE ingredient_quantities.recipe_id = $1;
    `,
    [recipe_id]
  );

  const ingredientIds = ingredientsRes.rows.map(i => i.ingredient_id);

  const restrictionsRes = await db.query(
    `
    SELECT ingredient_id, restriction_name
    FROM ingredient_dietary_restrictions idr
    JOIN dietary_restrictions dr ON idr.restriction_id = dr.restriction_id
    WHERE ingredient_id = ANY($1);
    `,
    [ingredientIds]
  );

  const restrictionsMap = {};
  restrictionsRes.rows.forEach(({ ingredient_id, restriction_name }) => {
    if (!restrictionsMap[ingredient_id]) restrictionsMap[ingredient_id] = [];
    restrictionsMap[ingredient_id].push(restriction_name);
  });

  return ingredientsRes.rows.map(ingredient => ({
    ...ingredient,
    dietary_restrictions: restrictionsMap[ingredient.ingredient_id] || []
  }));
};

const updateRecipeFlags = async (recipe_id, labels) => {
  const setClauses = Object.entries(labels)
    .map(([key, val]) => `${key} = ${val}`)
    .join(', ');
  const query = `UPDATE recipes SET ${setClauses} WHERE recipe_id = $1`;
  await db.query(query, [recipe_id]);
};

const run = async () => {
  const dietTypes = await getDietTypes();
  const recipes = await getAllRecipes();

  for (const recipe_id of recipes) {
    const ingredients = await getIngredientsWithRestrictions(recipe_id);
    const labels = {};
    dietTypes.forEach(diet => {
      labels[`is_${diet.replace(/-/g, '_')}`] = ingredients.every(ing =>
        ing.dietary_restrictions.includes(diet)
      );
    });
    await updateRecipeFlags(recipe_id, labels);
  }

  // console.log('Recipe dietary labels updated.');
};

run().catch(console.error);
module.exports = run;