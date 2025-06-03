const { get } = require("../app");
const db = require("../db");
const endpointsJson = require("../endpoints.json");
const {
  selectRecipes,
  selectRecipeById,
  addRecipeToFavourites,
  selectUserFavourites,
  removeFromFavourites,
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

// const deleteFromFavourites = (req, res, next) => {
//   const { user_id, recipe_id } = req.params;

//   removeFromFavourites(user_id, recipe_id)
//     .then(() => {
//       return res.status(204).send();
//     })
//     .catch(next);
// };

const deleteFromFavourites = async (req, res, next) => {
  const { user_id, recipe_id } = req.params;

  try {
    await removeFromFavourites(user_id, recipe_id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const deleteUserRecipe = async (req, res, next) => {
  const {user_id, recipe_id} = req.params
  console.log(req.params)

  try {
    await removeUserRecipe(user_id, recipe_id)
    res.status(204).send();
  } catch(err) {
    next(err)
  }
}

module.exports = {
  getRecipes,
  getRecipeById,
  getApiDocumentation,
  postRecipeToFavourites,
  getUserFavourites,
  deleteFromFavourites,
  deleteUserRecipe
};
