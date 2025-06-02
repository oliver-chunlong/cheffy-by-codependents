const db = require('../db');

const selectRecipes = () => {
  return db.query('SELECT * FROM recipes').then((result) => result.rows);
};


const selectRecipeById = async (recipe_id) => {
  if (isNaN(Number(recipe_id))) {
    return Promise.reject({ status: 400, msg: "Invalid recipe ID" });
  }

  //first query is modified so it displays the creator name and not number
  const recipeRes = await db.query(
    `
    SELECT r.recipe_id, r.recipe_name, r.recipe_description, r.recipe_img_url,
           r.created_by, u.username AS created_by_username
    FROM recipes r
    JOIN users u ON r.created_by = u.user_id
    WHERE r.recipe_id = $1;
    `,
    [recipe_id]
  );

  if (!recipeRes.rows.length) {
    return Promise.reject({ status: 404, msg: "Recipe not found" });
  }

  const recipe = recipeRes.rows[0];

  //second query will display the ingredients based on ingredient table
  const ingredientsRes = await db.query(
    `
    SELECT
      ingredients.id AS ingredient_id,
      ingredients.ingredient_name,
      ingredient_quantities.quantity_numerical::float AS quantity_numerical,
      ingredient_quantities.quantity_unit,
      ingredient_quantities.optional
    FROM ingredient_quantities
    JOIN ingredients ON ingredient_quantities.ingredient_id = ingredients.id
    WHERE ingredient_quantities.recipe_id = $1;
    `,
    [recipe_id]
  );

    //third query will connect the instructions with the recipe
  const instructionsRes = await db.query(
    `
    SELECT step_number, step_description, time_required::int AS time_required, timed_task
    FROM instructions
    WHERE recipe_id = $1
    ORDER BY step_number ASC;
    `,
    [recipe_id]
  );

  recipe.ingredients = ingredientsRes.rows;
  recipe.instructions = instructionsRes.rows;

  return recipe;
};

  
module.exports = { selectRecipes, selectRecipeById };