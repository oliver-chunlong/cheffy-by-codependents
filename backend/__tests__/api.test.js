const endpointsJson = require("../endpoints.json");
const db = require("../db/connection.js");
const seed = require("../db/seed");
const request = require("supertest");
const app = require("../app");
const run = require("../utils/updateRecipeLabels");

beforeEach(async () => {
  await seed();
  await run();
  await db.query(`INSERT INTO users (user_id, username) VALUES ($1, $2)`, [
    123,
    "no_favourites_user",
  ]);
});

afterAll(async () => {
  await db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/recipes", () => {
  test("200: Responds with an array of recipe objects, each of which should have an id, name, img_url and description", () => {
    return request(app)
      .get("/api/recipes")
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes).toHaveLength(5);
        body.recipes.forEach((recipe) => {
          expect(recipe).toMatchObject({
            recipe_id: expect.any(Number),
            recipe_name: expect.any(String),
            recipe_img_url: expect.any(String),
            recipe_description: expect.any(String),
          });
        });
      });
  });
  test("200: Filters recipes by is_vegan=true", () => {
    return request(app)
      .get("/api/recipes?is_vegan=true")
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBeGreaterThan(0);
        body.recipes.forEach((recipe) => {
          expect(recipe.is_vegan).toBe(true);
        });
      });
  });
});

describe("GET /api/recipes/:recipe_id", () => {
  test("200: Responds with a recipe object, with recipe_name, recipe_description, recipe_img_url, created_by", () => {
    return request(app)
      .get("/api/recipes/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.recipe).toEqual(
          expect.objectContaining({
            recipe_id: expect.any(Number),
            recipe_name: expect.any(String),
            recipe_img_url: expect.any(String),
            recipe_description: expect.any(String),
          })
        );
      });
  });
  test("200: Responds with the recipe object with added ingredients and instructions", () => {
    return request(app)
      .get("/api/recipes/1")
      .expect(200)
      .then(({ body }) => {
        const recipe = body.recipe;
        expect(recipe).toHaveProperty("ingredients");
        expect(Array.isArray(recipe.ingredients)).toBe(true);
        expect(recipe.ingredients[0]).toEqual(
          expect.objectContaining({
            ingredient_id: expect.any(Number),
            ingredient_name: expect.any(String),
            quantity_numerical: expect.any(Number),
            quantity_unit: expect.any(String),
            optional: expect.any(Boolean),
          })
        );

        expect(recipe).toHaveProperty("instructions");
        expect(Array.isArray(recipe.instructions)).toBe(true);
        expect(recipe.instructions[0]).toEqual(
          expect.objectContaining({
            step_number: expect.any(Number),
            step_description: expect.any(String),
            time_required: expect.any(Number),
            timed_task: expect.any(Boolean),
          })
        );
      });
  });
});

describe("POST /api/users/:user_id/favourites", () => {
  test("201: Adds a recipe to the user's favourites and returns a success message", () => {
    const userId = 1;
    const newFavouriteRecipe = { recipe_id: 2 };

    return request(app)
      .post(`/api/users/${userId}/favourites`)
      .send(newFavouriteRecipe)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual({
          msg: "Recipe added to favourites",
          favourite: {
            user_id: userId,
            recipe_id: newFavouriteRecipe.recipe_id,
          },
        });
      });
  });

  test("400: Responds with error when recipe_id is missing", () => {
    return request(app)
      .post("/api/users/1/favourites")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Missing recipe_id in body");
      });
  });
  test("404: Responds with error if user or recipe does not exist", () => {
    return request(app)
      .post("/api/users/9999/favourites")
      .send({ recipe_id: 9999 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User or recipe not found");
      });
  });});

describe("GET /api/users/:user_id/favourites", () => {
  test("200: Responds with an array of the user's favourite recipes", () => {
    const userId = 1;

    return request(app)
      .get(`/api/users/${userId}/favourites`)
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.favourites)).toBe(true);

        body.favourites.forEach((favourite) => {
          expect(favourite).toHaveProperty("user_id", userId);
          expect(favourite).toHaveProperty("recipe_id");
          expect(typeof favourite.recipe_id).toBe("number");
        });
      });
  });

  test("200: Returns a message if the user has no favourite recipes", () => {
    const userId = 123;

    return request(app)
      .get(`/api/users/${userId}/favourites`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          msg: "User has no favourite recipes",
          favourites: [],
        });
      });
  });

  test("404: Responds with an error message when user does not exist", () => {
    const invalidUserId = 9999;

    return request(app)
      .get(`/api/users/${invalidUserId}/favourites`)
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "User not found" });
      });
  });
});

describe("GET /api/users/:user_id/recipes", () => {
  test("200: Responds with an array of recipes created by the user", () => {
    const userId = 1;
    return request(app)
      .get(`/api/users/${userId}/recipes`)
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.recipes)).toBe(true);
        body.recipes.forEach((recipe) => {
          expect(recipe).toMatchObject({
            recipe_id: expect.any(Number),
            recipe_name: expect.any(String),
            recipe_img_url: expect.any(String),
            recipe_description: expect.any(String),
            created_by: userId,
          });
        });
      });
  });

  test("200: Responds with message and empty array if user has no recipes", () => {
    const userId = 2; 
    return request(app)
      .get(`/api/users/${userId}/recipes`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          msg: "User has no recipes",
          recipes: [],
        });
      });
  });

  test("404: Responds with error if user does not exist", () => {
    const invalidUserId = 9999;
    return request(app)
      .get(`/api/users/${invalidUserId}/recipes`)
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "User not found" });
      });
    });
  });
  
describe("DELETE /api/users/:user_id/favourites/:recipe_id", () => {
  test("204: Responds with no content after successful deletion and checks that the recipe is deleted", () => {
    const userId = 1;
    const recipeId = 2;

    return request(app)
      .delete(`/api/users/${userId}/favourites/${recipeId}`)
      .expect(204)
      .then((res) => {
        expect(res.text).toBe("");
        return request(app)
          .delete(`/api/users/${userId}/favourites/${recipeId}`)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Favourite not found");
          });
      });
  });

  test("404: Responds with an error message when the user is valid but out of range", () => {
    const outOfRangeUserId = 9999;
    const recipeId = 2;

    return request(app)
      .delete(`/api/users/${outOfRangeUserId}/favourites/${recipeId}`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });

  test("404: Responds with an error message when the recipe id is valid but out of range", () => {
    const userId = 1;
    const outOfRangeRecipeId = 9999;

    return request(app)
      .delete(`/api/users/${userId}/favourites/${outOfRangeRecipeId}`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Recipe not found");
      });
  });

  test("404: Responds with an error message when both user and recipe ids are valid, but corresponding recipe is not favourited", () => {
    const userId = 1;
    const notFavouritedRecipeId = 3;

    return request(app)
      .delete(`/api/users/${userId}/favourites/${notFavouritedRecipeId}`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Favourite not found");
      });
  });
});

describe('POST /api/users/:user_id/recipes', () => {
  test('201: creates and returns a new recipe', () => {
    const newRecipe = {
      recipe_name: 'Spicy Coconut Chickpea Curry',
      recipe_description: 'Creamy coconut curry with chickpeas, tomato, and warming spices',
      recipe_img_url: 'https://example.jpg'
    };
    
    return request(app)
      .post('/api/users/1/recipes')
      .send(newRecipe)
      .expect(201)
      .then(({ body }) => {
        const { recipe } = body;
        expect(recipe).toEqual(
          expect.objectContaining({
            recipe_id: expect.any(Number),
            recipe_name: 'Spicy Coconut Chickpea Curry',
            recipe_description: 'Creamy coconut curry with chickpeas, tomato, and warming spices',
            recipe_img_url: 'https://example.jpg',
            created_by: 1,
            is_vegetarian: expect.any(Boolean),
            is_vegan: expect.any(Boolean),
            is_gluten_free: expect.any(Boolean),
            is_dairy_free: expect.any(Boolean),
            is_nut_free: expect.any(Boolean)
          })
        );
    
      });
  });

  test('400: missing required fields', () => {
    return request(app)
      .post('/api/users/1/recipes')
      .send({ recipe_name: 'No Description' }) // missing fields
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Missing required fields');
      });
  });

  test('404: non-existent user ID', () => {
    const newRecipe = {
      recipe_name: 'Ghost Recipe',
      recipe_description: 'Vanishing ingredients',
      recipe_img_url: 'https://example.jpg',
    };

    return request(app)
      .post('/api/users/9999/recipes')
      .send(newRecipe)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('User not found');
      });
  });

  test('400: invalid user ID type', () => {
    const newRecipe = {
      recipe_name: 'Bad User',
      recipe_description: 'Wrong ID type',
      recipe_img_url: 'https://example.jpg',
    };
  
    return request(app)
      .post('/api/users/not-a-number/recipes')
      .send(newRecipe)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid user ID');
      });
  });
});

xdescribe('POST /api/recipes/:recipe_id/ingredients', () => {
  test('201: adds full list of ingredients to a recipe', () => {
    const newIngredients = [
      { ingredient_id: 1, quantity: 400, unit: 'g' },
      { ingredient_id: 26, quantity: 200, unit: 'ml' },
      { ingredient_id: 2, quantity: 1, unit: 'medium' },
      { ingredient_id: 3, quantity: 3, unit: 'cloves' },
      { ingredient_id: 4, quantity: 1, unit: 'tbsp' },
      { ingredient_id: 5, quantity: 2, unit: 'whole' },
      { ingredient_id: 6, quantity: 1, unit: 'tsp' },
      { ingredient_id: 7, quantity: 1, unit: 'tsp' },
      { ingredient_id: 8, quantity: 0.5, unit: 'tsp' },
      { ingredient_id: 27, quantity: 1, unit: 'whole' },
      { ingredient_id: 10, quantity: 1, unit: 'tbsp' }
    ];

    return request(app)
      .post('/api/recipes/1/ingredients')
      .send({ ingredients: newIngredients })
      .expect(201)
      .then(({ body }) => {
        const { ingredients } = body;
        expect(ingredients).toHaveLength(11);
        ingredients.forEach((ing) => {
          expect(ing).toEqual(
            expect.objectContaining({
              recipe_id: 1,
              ingredient_id: expect.any(Number),
              quantity: expect.any(Number),
              unit: expect.any(String)
            })
          );
        });
      });
  });
});

xdescribe('POST /api/recipes/:recipe_id/instructions', () => {
  test('201: adds cooking instructions with ingredient references', () => {
    const newInstructions = [
      {
        step_number: 1,
        description: 'Heat olive oil in a pan and sauté onion until soft.',
        iq_id: 1, // olive oil
        time_minutes: 5,
        is_active: true
      },
      {
        step_number: 2,
        description: 'Add garlic, ginger, cumin, coriander, turmeric, and chilli pepper. Cook until fragrant.',
        iq_id: 2, // garlic or one relevant spice
        time_minutes: 3,
        is_active: true
      },
      {
        step_number: 3,
        description: 'Stir in chopped tomatoes and cook until softened.',
        iq_id: 3, // tomato
        time_minutes: 5,
        is_active: true
      },
      {
        step_number: 4,
        description: 'Add chickpeas and coconut milk. Simmer until thickened.',
        iq_id: 4, // chickpeas
        time_minutes: 10,
        is_active: true
      },
      {
        step_number: 5,
        description: 'Serve hot with fresh coriander if desired.',
        iq_id: 5, // coriander
        time_minutes: null,
        is_active: false
      }
    ];

    return request(app)
      .post('/api/recipes/6/instructions')
      .send({ instructions: newInstructions })
      .expect(201)
      .then(({ body }) => {
        const { instructions } = body;
        expect(instructions).toHaveLength(5);
        instructions.forEach((step, index) => {
          expect(step).toEqual(
            expect.objectContaining({
              recipe_id: 6,
              step_number: index + 1,
              description: expect.any(String),
              iq_id: expect.any(Number),
              time_minutes: expect.anything(),
              is_active: expect.any(Boolean)
            })
          );
        });
      });
  });
});
