const express = require("express");
const db = require("./db/connection");
const { getRecipes } = require('./controllers/recipes.controller');

const app = express();
app.use(express.json());

app.get('/api/recipes', getRecipes);
// app.get('/api/recipes/:recipe_id', getRecipesById);
// app.get('/api/users/:user_id/recipes', getUsersRecipes);
// app.post('/api/users/:user_id/recipes', postRecipe);
// app.get('/api/users/:user_id/favourites', getFavouriteRecipes);
// app.post('/api/users/:user_id/favourites', addToFavourites);
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