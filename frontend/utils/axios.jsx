import axios from "axios";

const endpoint = "https://cheffy-by-codependents.onrender.com/api";

export const requestRecipes = ({ searchQuery, filters = {}, order } = {}) => {
  const params = new URLSearchParams();

  if (searchQuery) params.append("search", searchQuery);
  Object.entries(filters).forEach(([key, val]) => {
    if (val) params.append(key, val);
  });

  if (order) {
    const [orderBy, sortOrder] = order.split("_"); 
    if (orderBy) params.append("order_by", orderBy);
    if (sortOrder) params.append("sort_order", sortOrder);
  }

  return axios.get(`${endpoint}/recipes?${params.toString()}`)
    .then((response) => response.data.recipes)
    .catch(console.log);
};

export const requestRecipeById = (recipeId) => {
  console.log('Requesting recipe by ID:', recipeId);
  return axios
    .get(`${endpoint}/recipes/${recipeId}`)
    .then((response) => {
      console.log('Raw recipe response:', response.data);
      if (!response.data || !response.data.recipe) {
        console.error('Invalid recipe response format:', response.data);
        throw new Error('Invalid recipe response format');
      }
      console.log('Successfully processed recipe:', {
        id: response.data.recipe.recipe_id,
        name: response.data.recipe.recipe_name
      });
      return response.data.recipe;
    })
    .catch((error) => {
      console.error('Error fetching recipe:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
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
  console.log('Creating new recipe:', { userId, recipeObject });
  return axios
    .post(`${endpoint}/users/${userId}/recipes`, recipeObject)
    .then((response) => {
      console.log('Recipe creation response:', response.data);
      if (!response.data.recipe) {
        throw new Error('Invalid response format from server');
      }
      return response.data.recipe;
    })
    .catch((error) => {
      console.error('Error creating recipe:', error.response?.data || error.message);
      throw error;
    });
};

export const requestFavouriteRecipes = (userId) => {
  console.log('Requesting favourites for user:', userId);
  return axios
    .get(`${endpoint}/users/${userId}/favourites`)
    .then((response) => {
      console.log('Raw favourites response:', response.data);
      const favourites = response.data.favourites || [];
      console.log('Processed favourites:', favourites);
      return favourites;
    })
    .catch((error) => {
      console.error('Error fetching favourites:', error.response?.data || error.message);
      throw error;
    });
};

export const postRecipeToFavourites = (userId, recipeId) => {
  console.log('Adding favourite:', { userId, recipeId });
  return axios
    .post(`${endpoint}/users/${userId}/favourites`, { recipe_id: recipeId })
    .then((response) => {
      console.log("Raw favourite added response:", response.data);
      const favourite = response.data.favourite || response.data;
      console.log("Processed favourite:", favourite);
      return favourite;
    })
    .catch((error) => {
      console.error("postRecipeToFavourites failed:", error.response?.data || error.message);
      throw error;
    });
};

export const removeRecipeFromFavourites = (userId, recipeId) => {
  console.log('Removing favourite:', { userId, recipeId });
  return axios
    .delete(`${endpoint}/users/${userId}/favourites/${recipeId}`)
    .then((response) => {
      console.log("Favourite removed response:", response.data);
      return { success: true };
    })
    .catch((error) => {
      console.error("removeRecipeFromFavourites failed:", error.response?.data || error.message);
      throw error;
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

export const getDietaryFlags = ingredients =>
  api.post('/dietary/flags', { ingredients })
     .then(response => response.data);

export const getAllIngredients = () =>
  api.get('/ingredients')
     .then(({ data }) =>
       data.ingredients.map(item => item.ingredient_name)
     );

