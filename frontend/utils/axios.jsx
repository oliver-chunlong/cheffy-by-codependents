import axios from "axios";

const endpoint = "https://cheffy-by-codependents.onrender.com/api";

export const requestRecipes = (searchQuery, filterBy, category, order) => {
  const params = new URLSearchParams();

  if (searchQuery) params.append("search", searchQuery);
  if (filterBy) params.append("filter", filterBy);
  if (category) params.append("category", category);
  if (order) params.append("order", order);

  return axios
    .get(`${endpoint}/recipes?${params.toString()}`)
    .then((response) => {
      return response.data.recipes;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const requestRecipeById = (recipeId) => {
  return axios
    .get(`${endpoint}/recipes/${recipeId}`)
    .then((response) => {
      return response.data.recipe;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const requestUserRecipes = (userId) => {
  return axios
    .get(`${endpoint}/users/${userId}/recipes`)
    .then((response) => {
      return response.data.recipes;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const postNewRecipe = (userId, recipeObject) => {
  return axios
    .post(`${endpoint}/users/${userId}/recipes`, recipeObject)
    .then((response) => {
      return response.data.recipe;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const requestFavouriteRecipes = (userId) => {
  return axios
    .get(`${endpoint}/users/${userId}/favourites`)
    .then((response) => {
      return response.data.favourites;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const postRecipeToFavourites = (userId, recipeId) => {
  return axios
    .post(`${endpoint}/users/${userId}/favourites`, { recipe_id: recipeId })
    .then((response) => {
      return response.data.recipe;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const removeRecipeFromFavourites = (userId, recipeId) => {
  return axios
    .delete(`${endpoint}/users/${userId}/favourites/${recipeId}`)
    .then((response) => {
      return response.data.recipe;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateUserRecipe = (userId, recipeId, recipeObject) => {
  return axios
    .patch(`${endpoint}/users/${userId}/recipes/${recipeId}`, recipeObject)
    .then((response) => {
      return response.data.recipe;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteUserRecipe = (userId, recipeId) => {
return axios
    .delete(`${endpoint}/users/${userId}/recipes/${recipeId}`)
    .then(response => {
     if (response.status !== 204) {
       throw new Error(`Unexpected status code ${response.status}`);
      }
    })
   .catch(err => {
      console.error('deleteUserRecipe failed:', err);
      throw err;
    });
};

export const api = axios.create({
  baseURL: 'https://cheffy-by-codependents.onrender.com/api',
  withCredentials: true,
});

// export const getDietaryFlags = ingredients =>
//   api.post('/dietary/flags', { ingredients })
//      .then(response => response.data);

export const getAllIngredients = () =>
  api.get('/ingredients')
     .then(({ data }) =>
       data.ingredients.map(item => item.ingredient_name)
     );

