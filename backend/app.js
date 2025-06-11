const express = require("express");
const cors = require("cors");
const db = require("./db/connection");
const dietaryRoutes = require("../backend/routes/dietrayRoutes")
const ingredientsRoute = require("../backend/routes/ingredients")
const { 
  getRecipes, 
  getRecipeById, 
  getApiDocumentation, 
  postRecipeToFavourites, 
  getUserFavourites, 
  deleteFromFavourites,
  getUserRecipes,
  postRecipe,
  deleteUserRecipe,
  editUserRecipe,
 } = require('./controllers/recipes.controller');

const app = express();

app.use(cors({
  origin: 'http://localhost:8081',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true}));
  
app.use(express.json());

app.get('/api', getApiDocumentation);
app.get('/api/recipes', getRecipes);
app.get('/api/recipes/:recipe_id', getRecipeById);
app.get('/api/users/:user_id/recipes', getUserRecipes);
app.post('/api/users/:user_id/recipes', postRecipe);
app.get('/api/users/:user_id/favourites', getUserFavourites);
app.post('/api/users/:user_id/favourites', postRecipeToFavourites);
app.patch('/api/users/:user_id/recipes/:recipe_id', editUserRecipe);
app.delete('/api/users/:user_id/recipes/:recipe_id', deleteUserRecipe);
app.delete('/api/users/:user_id/favourites/:recipe_id', deleteFromFavourites);
app.use('/api', dietaryRoutes);
app.use('/api/ingredients', ingredientsRoute);


app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    return res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    return res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  return res.status(500).send({ msg: "Internal Server Error" });
});  

module.exports = app;