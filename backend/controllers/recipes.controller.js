const { get } = require('../app');
const db = require('../db/connection.js');
const endpointsJson = require("../endpoints.json");
const {
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
} = require("../models/recipes.model");

const getApiDocumentation = (req, res) => {
  res.status(200).send({ endpoints: endpointsJson });
};

const getRecipes = (req, res, next) => {
  selectRecipes(req.query)
    .then((recipes) => {
      res.status(200).send({ recipes });
    })
    .catch(next);
};

const getRecipeById = (req, res, next) => {
  const { recipe_id } = req.params;

  selectRecipeById(recipe_id)
    .then((recipe) => {
      if (!recipe) {
        return Promise.reject({ status: 404, msg: "Recipe not found" });
      }
      res.status(200).send({ recipe });
    })
    .catch(next);
};

const postRecipeToFavourites = async (req, res, next) => {
  const { user_id } = req.params;
  const { recipe_id } = req.body;
  if (!recipe_id) {
    return res.status(400).json({ msg: "Missing recipe_id in body" });
  }
  try {
    const favourite = await addRecipeToFavourites(user_id, recipe_id);
    res.status(201).json({ msg: "Recipe added to favourites", favourite });
  } catch (err) {
    next(err);
  }
};

const getUserFavourites = async (req, res, next) => {
  const { user_id } = req.params;

  try {
    const favourites = await selectUserFavourites(user_id);

    if (favourites.length === 0) {
      return res.status(200).json({
        msg: "User has no favourite recipes",
        favourites: [],
      });
    }

    res.status(200).json({ favourites });
  } catch (err) {
    next(err);
  }
};

// const deleteFromFavourites = async (req, res, next) => {
//   const { user_id, recipe_id } = req.params;
//   try {
//     const recipeToDelete = await removeFromFavourites(recipe_id)
//   }
// }

const deleteFromFavourites = (req, res, next) => {
  const { user_id, recipe_id } = req.params;

  removeFromFavourites(user_id, recipe_id)
    .then(() => {
      return res.status(204).send();
    })
    .catch(next);
};

const getUserRecipes = (req, res, next) => {
  const {user_id} = req.params;

  checkUserExists(user_id)
    .then(userExists => {
      if (!userExists) {
        return res.status(404).json({ msg: "User not found" });
      }
      return selectUserRecipes(user_id);
    })
    .then(recipes => {
      if (!recipes) return; 
      if (recipes.length === 0) {
        return res.status(200).json({ msg: "User has no recipes", recipes: [] });
      }
      res.status(200).json({ recipes });
    })
    .catch(next);
};

const postRecipe = async (req, res, next) => {
  const { recipe_name, recipe_description, recipe_img_url, ingredients, instructions } = req.body;
  const user_id = Number(req.params.user_id);

  if (!recipe_name || !recipe_description || !recipe_img_url) {
    return res.status(400).json({ msg: 'Missing required fields' });
  }

  if (isNaN(user_id)) {
    return res.status(400).json({ msg: 'Invalid user ID' });
  }

  try {
    const userExists = await checkUserExists(user_id);
    if (!userExists) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const recipe = await insertRecipe({ 
      recipe_name, 
      recipe_description, 
      recipe_img_url, 
      created_by: user_id 
    });

    let insertedIngredients = [];
    if (ingredients && ingredients.length > 0) {
      insertedIngredients = await addIngredientsToRecipe(recipe.recipe_id, ingredients);
    }

    let insertedInstructions = [];
    if (instructions && instructions.length > 0) {
      insertedInstructions = await addInstructionsToRecipe(recipe.recipe_id, instructions);
    }

    res.status(201).json({ recipe, ingredients: insertedIngredients, instructions: insertedInstructions });  
  } catch (err) {
    next(err);
  }
};

const editUserRecipe = async (req, res) => {
  const { user_id, recipe_id } = req.params;
  const updateData = req.body;

  try {
    const updated = await updateUserRecipe(user_id, recipe_id, updateData);
    res.status(200).json(updated);
  } catch (error) {
    console.error('Error in editUserRecipe:', error);
    res.status(error.status || 500).json({ msg: error.msg || 'Failed to update recipe' });
  }
};




module.exports = {
  getRecipes,
  getRecipeById,
  getApiDocumentation,
  postRecipeToFavourites,
  getUserFavourites,
  deleteFromFavourites,
  getUserRecipes,
  postRecipe,
  editUserRecipe
};
