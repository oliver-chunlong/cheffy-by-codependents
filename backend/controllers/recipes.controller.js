const { get } = require('../app');
const db = require('../db');
const endpointsJson = require("../endpoints.json");
const { selectRecipes, selectRecipeById } = require('../models/recipes.model');

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
          return Promise.reject({ status: 404, msg: 'Recipe not found' });
        }
        res.status(200).send({recipe});
      })
      .catch(next);
  };

  

module.exports = { getRecipes, getRecipeById, getApiDocumentation  };
