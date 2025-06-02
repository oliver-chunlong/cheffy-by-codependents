const { selectRecipes } = require('../models/recipes.model');

const getRecipes = (req, res, next) => {
  selectRecipes()
    .then((recipes) => {
      console.log(recipes);
      res.status(200).send({ recipes });
    })
    .catch(next);
};

module.exports = { getRecipes };
