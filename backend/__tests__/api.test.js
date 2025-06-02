const endpointsJson = require("../endpoints.json");
const db = require("../db/index.js");
const seed = require("../db/seed");
const request = require("supertest");
const app = require("../app");

beforeEach(() => {
  return seed();
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
  test("201: adds a recipe to the user's favourites and returns a success message", () => {
    const userId = 1;
    const newFavouriteRecipe = { recipe_id: 2 };

    return request(app)
      .post(`/api/users/${userId}/favourites`)
      .send(newFavouriteRecipe)
      .expect(201)
      .then(({ body }) => {
        console.log("Hello")
        expect(body).toEqual({
          msg: "Recipe added to favourites",
          favourite: {
            user_id: userId,
            recipe_id: newFavouriteRecipe.recipe_id,
          },
        });
      });
  });

  test("400: responds with error when recipe_id is missing", () => {
    return request(app)
      .post("/api/users/1/favourites")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Missing recipe_id in body");
      });
  });

  test("404: responds with error if user or recipe does not exist", () => {
    return request(app)
      .post("/api/users/9999/favourites")
      .send({ recipe_id: 9999 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User or recipe not found");
      });
  });
});
