const endpointsJson = require("../endpoints.json");
const db = require("../db/connection");
const seed = require("../../db/seed");
const data = require("");
const request = require("supertest");
const app = require("../api");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
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