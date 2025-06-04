const db = require("../db/connection.js");

const validFilters = [
  "is_vegetarian",
  "is_vegan",
  "is_gluten_free",
  "is_dairy_free",
  "is_nut_free",
];

const selectRecipes = (filters = {}, order_by, sort_order = "asc") => {
  const filterKeys = Object.keys(filters).filter(key => validFilters.includes(key));
  const queryValues = [];

  let selectPart = `SELECT *`;
  let joinPart = ``;

  if (order_by === "time") {
    selectPart += `, t.total_time AS total_time`;
    joinPart = `
      LEFT JOIN (
        SELECT recipe_id, SUM(time_required) AS total_time
        FROM instructions
        WHERE time_required IS NOT NULL
        GROUP BY recipe_id
      ) t ON recipes.recipe_id = t.recipe_id
    `;
  }

  let queryStr = `${selectPart} FROM recipes ${joinPart}`;

  if (filterKeys.length) {
    const conditions = filterKeys.map((key, index) => {
      queryValues.push(filters[key]);
      return `${key} = $${index + 1}`;
    });
    queryStr += ` WHERE ` + conditions.join(" AND ");
  }

  if (order_by === "name") {
    queryStr += ` ORDER BY recipe_name ${sort_order === "desc" ? "DESC" : "ASC"}`;
  } else if (order_by === "time") {
    queryStr += ` ORDER BY total_time ${sort_order === "desc" ? "DESC" : "ASC"}`;
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

const addRecipeToFavourites = async (user_id, recipe_id) => {
  const userCheck = await db.query(`SELECT * FROM users WHERE user_id = $1`, [
    user_id,
  ]);
  const recipeCheck = await db.query(
    `SELECT * FROM recipes WHERE recipe_id = $1`,
    [recipe_id]
  );

  if (userCheck.rowCount === 0 || recipeCheck.rowCount === 0) {
    throw { status: 404, msg: "User or recipe not found" };
  }

  const existingFavourites = await db.query(
    `SELECT * FROM user_favourites WHERE user_id = $1 AND recipe_id = $2`,
    [user_id, recipe_id]
  );
  if (existingFavourites.rowCount > 0) {
    return existingFavourites.rows[0];
  }

  const result = await db.query(
    `INSERT INTO user_favourites (user_id, recipe_id)
     VALUES ($1, $2)
     RETURNING *`,
    [user_id, recipe_id]
  );
  return result.rows[0];
};

const selectUserFavourites = async (user_id) => {
  const user = await db.query(`SELECT * FROM users WHERE user_id = $1`, [
    user_id,
  ]);

  if (user.rowCount === 0) {
    throw { status: 404, msg: "User not found" };
  }

  const result = await db.query(
    `SELECT user_id, recipe_id FROM user_favourites WHERE user_id = $1`,
    [user_id]
  );

  return result.rows;
};

const removeFromFavourites = async (user_id, recipe_id) => {
  const userCheck = await db.query("SELECT * FROM users WHERE user_id = $1", [
    user_id,
  ]);
  const recipeCheck = await db.query(
    "SELECT * FROM recipes WHERE recipe_id = $1",
    [recipe_id]
  );
  const favouriteCheck = await db.query(
    "SELECT * FROM user_favourites WHERE user_id = $1 AND recipe_id = $2",
    [user_id, recipe_id]
  );

  if (userCheck.rowCount === 0) {
    throw { status: 404, msg: "User not found" };
  }

  if (recipeCheck.rowCount === 0) {
    throw { status: 404, msg: "Recipe not found" };
  }

  if (favouriteCheck.rowCount === 0) {
    throw { status: 404, msg: "Favourite not found" };
  }

  const result = await db
    .query(`DELETE FROM user_favourites WHERE user_id = $1 AND recipe_id = $2`, [
      user_id,
      recipe_id,
    ])
    .then(({ rows }) => {
      return rows;
    });
};

const checkUserExists = async (user_id) => {
  const result = await db.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
  return result.rowCount > 0;
};

const selectUserRecipes = async (user_id) => {
  const result = await db.query(
    `SELECT recipe_id, recipe_name, recipe_img_url, recipe_description, created_by
     FROM recipes WHERE created_by = $1`,
    [user_id]
  );
  return result.rows;
};

const insertRecipe = async ({ recipe_name, recipe_description, recipe_img_url, created_by }) => {
  const result = await db.query(
    `
    INSERT INTO recipes (recipe_name, recipe_description, recipe_img_url, created_by)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
    [recipe_name, recipe_description, recipe_img_url, created_by]
  );
  return result.rows[0];
};

const addIngredientsToRecipe = async (recipe_id, ingredients) => {
  const queryStr = `
    INSERT INTO ingredient_quantities (recipe_id, ingredient_id, quantity_numerical, quantity_unit)
    VALUES ${ingredients.map((_, i) => `($1, $${i * 3 + 2}, $${i * 3 + 3}, $${i * 3 + 4})`).join(', ')}
    RETURNING *;
  `;

  const values = [recipe_id, ...[].concat(...ingredients.map(({ ingredient_id, quantity, unit }) => [ingredient_id, quantity, unit]))];

  const result = await db.query(queryStr, values);
  return result.rows;
};

const addInstructionsToRecipe = async (recipe_id, instructions) => {
  if (!instructions || instructions.length === 0) return [];

  const queryStr = `
    INSERT INTO instructions (recipe_id, step_number, step_description, iq_id, time_required, timed_task)
    VALUES ${instructions.map((_, i) => 
      `($1, $${i * 5 + 2}, $${i * 5 + 3}, $${i * 5 + 4}, $${i * 5 + 5}, $${i * 5 + 6})`
    ).join(', ')}
    RETURNING instruction_id, recipe_id, step_number, step_description, iq_id, time_required, timed_task;
  `;

  const values = [
    recipe_id,
    ...[].concat(...instructions.map(({ step_number, step_description, iq_id = null, time_required = null, timed_task = false }) =>
      [step_number, step_description, iq_id, time_required, timed_task]
    ))
  ];

  const result = await db.query(queryStr, values);

  return result.rows.map(row => ({
    ...row,
    time_required: row.time_required === null ? null : Number(row.time_required),
  }));
};

const updateUserRecipe = async (user_id, recipe_id, updateData) => {
  if (isNaN(Number(user_id))) throw { status: 400, msg: "Invalid user ID" }
  if (isNaN(Number(recipe_id))) throw { status: 400, msg: "Invalid recipe ID" }
  if (!updateData || Object.keys(updateData).length === 0) throw { status: 400, msg: "No data to update" }

  let setParts = []
  let values = []
  let i = 1

  for (const key in updateData) {
    if (key !== "ingredients" && key !== "instructions") {
      setParts.push(`${key} = $${i}`)
      values.push(updateData[key])
      i++
    }
  }

  if (setParts.length > 0) {
    values.push(user_id)
    values.push(recipe_id)

    const sql = `UPDATE recipes SET ${setParts.join(", ")} WHERE created_by = $${i} AND recipe_id = $${i+1} RETURNING *`
    const res = await db.query(sql, values)
    if (res.rows.length === 0) throw { status: 404, msg: "Recipe not found or not owned by user" }
  }

  if (Array.isArray(updateData.ingredients)) {
    for (const ing of updateData.ingredients) {
      const res = await db.query(
        "SELECT iq_id FROM ingredient_quantities WHERE recipe_id = $1 AND ingredient_id = $2",
        [recipe_id, ing.ingredient_id]
      )
      if (res.rows.length) {
        await db.query(
          "UPDATE ingredient_quantities SET quantity_numerical = $1, quantity_unit = $2, optional = $3 WHERE recipe_id = $4 AND ingredient_id = $5",
          [ing.quantity_numerical, ing.quantity_unit, ing.optional || false, recipe_id, ing.ingredient_id]
        )
      } else {
        await db.query(
          "INSERT INTO ingredient_quantities (recipe_id, ingredient_id, quantity_numerical, quantity_unit, optional) VALUES ($1,$2,$3,$4,$5)",
          [recipe_id, ing.ingredient_id, ing.quantity_numerical, ing.quantity_unit, ing.optional || false]
        )
      }
    }
  }

  if (Array.isArray(updateData.instructions)) {
    for (const ins of updateData.instructions) {
      const res = await db.query(
        "SELECT instruction_id FROM instructions WHERE recipe_id = $1 AND step_number = $2",
        [recipe_id, ins.step_number]
      )
      if (res.rows.length) {
        await db.query(
          "UPDATE instructions SET step_description = $1, iq_id = $2, time_required = $3, timed_task = $4 WHERE recipe_id = $5 AND step_number = $6",
          [ins.step_description, ins.iq_id || null, ins.time_required || null, ins.timed_task || false, recipe_id, ins.step_number]
        )
      } else {
        await db.query(
          "INSERT INTO instructions (recipe_id, step_number, step_description, iq_id, time_required, timed_task) VALUES ($1,$2,$3,$4,$5,$6)",
          [recipe_id, ins.step_number, ins.step_description, ins.iq_id || null, ins.time_required || null, ins.timed_task || false]
        )
      }
    }
  }

  const recipeRes = await db.query("SELECT * FROM recipes WHERE recipe_id = $1", [recipe_id])
  if (!recipeRes.rows.length) throw { status: 404, msg: "Recipe not found" }

  const ingredientsRes = await db.query(
    "SELECT iq.iq_id, iq.recipe_id, iq.ingredient_id, iq.quantity_numerical, iq.quantity_unit, iq.optional, ing.ingredient_name FROM ingredient_quantities iq JOIN ingredients ing ON iq.ingredient_id = ing.id WHERE iq.recipe_id = $1",
    [recipe_id]
  )

  const instructionsRes = await db.query(
    "SELECT instruction_id, recipe_id, step_number, step_description, iq_id, time_required, timed_task FROM instructions WHERE recipe_id = $1 ORDER BY step_number",
    [recipe_id]
  )

  return {
    recipe: recipeRes.rows[0],
    ingredients: ingredientsRes.rows,
    instructions: instructionsRes.rows,
  }
}




module.exports = {
  selectRecipes,
  selectRecipeById,
  addRecipeToFavourites,
  selectUserFavourites,
  removeFromFavourites,
  selectUserRecipes,
  checkUserExists,
  insertRecipe,
  addIngredientsToRecipe,
  addInstructionsToRecipe,
  updateUserRecipe
};
