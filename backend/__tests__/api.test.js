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
        expect(Array.isArray(body.recipes)).toBe(true);
        expect(body.recipes.length).toBeGreaterThan(0);
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
  test("200: Orders recipes by recipe_name ascending", () => {
    return request(app)
      .get("/api/recipes?order_by=name&sort_order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body.recipes.length).toBeGreaterThan(1);
        const names = body.recipes.map(r => r.recipe_name);
        const sortedNames = [...names].sort();
        expect(names).toEqual(sortedNames);
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

describe('POST /api/users/:user_id/recipes with ingredients', () => {
  test('201: creates recipe and adds full list of ingredients', () => {
    const newRecipe = {
      recipe_name: 'Spicy Coconut Chickpea Curry',
      recipe_description: 'Creamy coconut curry with chickpeas, tomato, and warming spices',
      recipe_img_url: 'https://example.jpg',
      ingredients: [
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
      ]
    };

    return request(app)
      .post('/api/users/1/recipes')
      .send(newRecipe)
      .expect(201)
      .then(({ body }) => {
        const { recipe, ingredients } = body;
        expect(recipe).toEqual(
          expect.objectContaining({
            recipe_id: expect.any(Number),
            recipe_name: newRecipe.recipe_name,
            recipe_description: newRecipe.recipe_description,
            recipe_img_url: newRecipe.recipe_img_url,
            created_by: 1,
          })
        );
        expect(ingredients).toHaveLength(newRecipe.ingredients.length);
        ingredients.forEach((ing) => {
          expect(ing).toEqual(
            expect.objectContaining({
              recipe_id: recipe.recipe_id,
              ingredient_id: expect.any(Number),
              quantity_numerical: expect.any(String),
              quantity_unit: expect.any(String),
              optional: expect.any(Boolean)            
            })
          );
        });
      });
  });
});

describe('POST /api/users/:user_id/recipes with instructions', () => {
  test('201: creates recipe with instructions', () => {
    const newRecipeWithInstructions = {
      recipe_name: 'Spicy Coconut Chickpea Curry',
      recipe_description: 'Creamy coconut curry with chickpeas, tomato, and warming spices',
      recipe_img_url: 'https://example.jpg',
      instructions: [
        { step_number: 1, step_description: 'Heat olive oil in a pan.', iq_id: null, time_required: 2, timed_task: true },
        { step_number: 2, step_description: 'Add chopped onion and sauté until translucent.', iq_id: null, time_required: 5, timed_task: true },
        { step_number: 3, step_description: 'Add minced garlic and grated ginger. Cook for 1 minute.', iq_id: null, time_required: 1, timed_task: true },
        { step_number: 4, step_description: 'Stir in cumin, coriander, turmeric, and chili pepper. Cook spices for 30 seconds.', iq_id: null, time_required: 0.5, timed_task: true },
        { step_number: 5, step_description: 'Add chopped tomatoes and cook until soft.', iq_id: null, time_required: 7, timed_task: true },
        { step_number: 6, step_description: 'Add chickpeas and coconut milk. Simmer for 20 minutes.', iq_id: null, time_required: 20, timed_task: true },
        { step_number: 7, step_description: 'Adjust salt and spices to taste. Serve hot.', iq_id: null, time_required: null, timed_task: false }
      ]
    };

    return request(app)
      .post('/api/users/1/recipes')
      .send(newRecipeWithInstructions)
      .expect(201)
      .then(({ body }) => {
        const { recipe, instructions } = body;
        expect(recipe).toEqual(
          expect.objectContaining({
            recipe_id: expect.any(Number),
            recipe_name: newRecipeWithInstructions.recipe_name,
            recipe_description: newRecipeWithInstructions.recipe_description,
            recipe_img_url: newRecipeWithInstructions.recipe_img_url,
            created_by: 1,
          })
        );
        expect(instructions).toHaveLength(newRecipeWithInstructions.instructions.length);
        instructions.forEach((inst, i) => {
          expect(inst).toEqual(
            expect.objectContaining({
              recipe_id: recipe.recipe_id,
              step_number: newRecipeWithInstructions.instructions[i].step_number,
              step_description: newRecipeWithInstructions.instructions[i].step_description,
              iq_id: newRecipeWithInstructions.instructions[i].iq_id,
              time_required: newRecipeWithInstructions.instructions[i].time_required,
              timed_task: newRecipeWithInstructions.instructions[i].timed_task,
            })
          );
        });
      });
  });
});

describe('PATCH /api/users/:user_id/recipes/:recipe_id', () => {
  test('200: updates recipe details', () => {
    const updatedRecipe = {
      recipe_name: 'Updated Recipe Name',
      recipe_description: 'Updated description',
      recipe_img_url: 'https://updated-image.jpg'
    };

    return request(app)
      .patch('/api/users/1/recipes/2')
      .send(updatedRecipe)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            recipe: expect.objectContaining({
              recipe_id: 2,
              recipe_name: updatedRecipe.recipe_name,
              recipe_description: updatedRecipe.recipe_description,
              recipe_img_url: updatedRecipe.recipe_img_url,
              created_by: 1
            })
          })
        );
      });
  });

  test('404: recipe not found', () => {
    const updatedRecipe = { recipe_name: 'No Recipe' };

    return request(app)
      .patch('/api/users/1/recipes/9999')
      .send(updatedRecipe)
      .expect(404);
  });
});

describe('PATCH /api/users/:user_id/recipes/:recipe_id with ingredients and instructions', () => {
  test('200: updates existing ingredients and instructions', () => {
    const updatedData = {
      ingredients: [
        { ingredient_id: 1, quantity_numerical: 350, quantity_unit: 'g' },
        { ingredient_id: 2, quantity_numerical: 2, quantity_unit: 'large' }
      ]  ,
      instructions: [
        { step_number: 1, step_description: 'Heat oil in a large pan.', iq_id: null, time_required: 3, timed_task: true },
        { step_number: 2, step_description: 'Add onions and sauté until golden.', iq_id: null, time_required: 6, timed_task: true }
      ]
    };

    return request(app)
      .patch('/api/users/1/recipes/2')
      .send(updatedData)
      .expect(200)
      .then(({ body }) => {
        expect(body.recipe).toEqual(expect.objectContaining({
          recipe_id: 2,
          recipe_name: expect.any(String),
          recipe_description: expect.any(String),
          recipe_img_url: expect.any(String),
          created_by: 1
        }));

        expect(body.ingredients).toEqual(expect.arrayContaining([
          expect.objectContaining({
            ingredient_id: 1,
            ingredient_name: expect.any(String),
            quantity_numerical: '350',
            quantity_unit: 'g',
            optional: expect.any(Boolean),
            iq_id: expect.any(Number)
          }),
          expect.objectContaining({
            ingredient_id: 2,
            ingredient_name: expect.any(String),
            quantity_numerical: '2',
            quantity_unit: 'large',
            optional: expect.any(Boolean),
            iq_id: expect.any(Number)
          })
        ]));

        expect(body.instructions).toEqual(expect.arrayContaining([
          expect.objectContaining({
            step_description: 'Heat oil in a large pan.',
            step_number: 1
          }),
          expect.objectContaining({
            step_description: 'Add onions and sauté until golden.',
            step_number: 2
          })
        ]));
      });
  });
});
