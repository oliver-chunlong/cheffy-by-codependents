const db = require('../db');

const validFilters = [
  "is_vegetarian",
  "is_vegan",
  "is_gluten_free",
  "is_dairy_free",
  "is_nut_free",
];

const selectRecipes = (filters = {}) => {
  const filterKeys = Object.keys(filters).filter(key => validFilters.includes(key));

  let queryStr = `SELECT * FROM recipes`;
  const queryValues = [];

  if (filterKeys.length) {
    const conditions = filterKeys.map((key, index) => {
      queryValues.push(filters[key]);
      return `${key} = $${index + 1}`;
    });
    queryStr += ` WHERE ` + conditions.join(" AND ");
  }

  return db.query(queryStr, queryValues).then(({ rows }) => rows);
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

  //fetch dietary restrictions for ingredients
  const ingredientIds = ingredientsRes.rows.map(i => i.ingredient_id);
  const restrictionsRes = await db.query(
    `
    SELECT ingredient_id, restriction_name
    FROM ingredient_dietary_restrictions idr
    JOIN dietary_restrictions dr ON idr.restriction_id = dr.restriction_id
    WHERE ingredient_id = ANY($1)
    `,
    [ingredientIds]
  );

  const restrictionsMap = {};
  restrictionsRes.rows.forEach(({ ingredient_id, restriction_name }) => {
    if (!restrictionsMap[ingredient_id]) restrictionsMap[ingredient_id] = [];
    restrictionsMap[ingredient_id].push(restriction_name);
  });

  ingredientsRes.rows.forEach(ingredient => {
    ingredient.dietary_restrictions = restrictionsMap[ingredient.ingredient_id] || [];
  });

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

  //decides if recipe corresponds to a dietary restriction
  const getDietTypes = async () => {
    const result = await db.query('SELECT restriction_name FROM dietary_restrictions');
    return result.rows.map(row => row.restriction_name);
  };
  
  const dietTypes = await getDietTypes();

  dietTypes.forEach(diet => {
    recipe[`is_${diet.replace(/-/g, '_')}`] = recipe.ingredients.every(ingredient =>
      ingredient.dietary_restrictions.includes(diet)
    );
  });

  return recipe;
};

module.exports = { selectRecipes, selectRecipeById };