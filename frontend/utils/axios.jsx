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
  console.log('requestRecipeById: Requesting recipe by ID:', recipeId);
  return axios
    .get(`${endpoint}/recipes/${recipeId}`)
    .then((response) => {
      console.log('requestRecipeById: Raw recipe response:', response.data);
      if (!response.data || !response.data.recipe) {
        console.error('requestRecipeById: Invalid recipe response format:', response.data);
        throw new Error('Invalid recipe response format');
      }
      
      const recipe = response.data.recipe;
      console.log('requestRecipeById: Recipe basic info:', {
        id: recipe.recipe_id,
        name: recipe.recipe_name,
        ingredientsCount: recipe.ingredients?.length || 0,
        instructionsCount: recipe.instructions?.length || 0
      });
      
      if (recipe.ingredients) {
        console.log('requestRecipeById: Recipe ingredients detail:', recipe.ingredients);
        recipe.ingredients.forEach((ing, index) => {
          console.log(`requestRecipeById: Ingredient ${index + 1}:`, {
            id: ing.ingredient_id,
            name: ing.ingredient_name,
            quantity: ing.quantity_numerical,
            unit: ing.quantity_unit
          });
        });
      } else {
        console.log('requestRecipeById: No ingredients found in recipe');
      }
      
      console.log('requestRecipeById: Successfully processed recipe:', {
        id: recipe.recipe_id,
        name: recipe.recipe_name
      });
      return recipe;
    })
    .catch((error) => {
      console.error('requestRecipeById: Error fetching recipe:', {
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
     .then(({ data }) => {
       console.log('getAllIngredients: Raw API response:', data);
       console.log('getAllIngredients: Ingredients array:', data.ingredients);
       
       const ingredientIdMap = {
         'avocado': 20,
         'basil': 13,
         'basmati rice': 10,
         'black beans': 19,
         'broccoli': 24,
         'butter': 16,
         'carrot': 25,
         'cheddar': 17,
         'chickpeas': 1,
         'chilli pepper': 28,
         'coconut milk': 27,
         'coriander': 7,
         'cumin': 6,
         'flour': 26,
         'garlic': 3,
         'ginger': 4,
         'lime': 21,
         'milk': 15,
         'mozzarella': 11,
         'olive oil': 9,
         'onion': 2,
         'pasta': 14,
         'sausage': 29,
         'soy sauce': 22,
         'tofu': 23,
         'tomato': 5,
         'tortilla': 18,
         'turmeric': 8
       };
       
       const ingredientsWithIds = data.ingredients.map(ingredient => ({
         ingredient_id: ingredientIdMap[ingredient.ingredient_name.toLowerCase()] || Date.now() + Math.random(),
         ingredient_name: ingredient.ingredient_name
       }));
       
       console.log('getAllIngredients: Ingredients with IDs:', ingredientsWithIds.slice(0, 5));
       return ingredientsWithIds;
     });