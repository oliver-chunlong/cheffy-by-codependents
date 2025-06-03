const express = require("express");
const db = require("./db/connection");
const { getRecipes, getRecipeById, getApiDocumentation, postRecipeToFavourites, getUserFavourites } = require('./controllers/recipes.controller');

const app = express();
app.use(express.json());

app.get('/api', getApiDocumentation);
app.get('/api/recipes', getRecipes);
app.get('/api/recipes/:recipe_id', getRecipeById);
// app.get('/api/users/:user_id/recipes', getUsersRecipes);
// app.post('/api/users/:user_id/recipes', postRecipe);
app.get('/api/users/:user_id/favourites', getUserFavourites);
app.post('/api/users/:user_id/favourites', postRecipeToFavourites);
// app.patch('/api/users/:user_id/recipes/:recipe_id', editUserRecipe);
// app.delete('/api/users/:user_id/recipes/:recipe_id', deleteRecipe);
// app.delete('/api/users/:user_id/favourites/:recipe_id', removeFromFavourites);

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    } else {
      console.error(err);
      res.status(500).send({ msg: 'Internal server error' });
    }
  });
  

module.exports = app;