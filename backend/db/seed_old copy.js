const db = require('./connection');
require('dotenv').config();

async function createTables() {
  await db.query(`

    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS recipes CASCADE; 
    DROP TABLE IF EXISTS ingredients CASCADE;
    DROP TABLE IF EXISTS dietary_restrictions CASCADE;
    DROP TABLE IF EXISTS user_dietary_restrictions;
    DROP TABLE IF EXISTS user_cooked_recipes;
    DROP TABLE IF EXISTS user_favorites;
    DROP TABLE IF EXISTS ingredient_dietary_restrictions;
    DROP TABLE IF EXISTS ingredient_quantities CASCADE;
    DROP TABLE IF EXISTS instructions;
    DROP TABLE IF EXISTS equipment;

      CREATE TABLE users (
      user_id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL
    );

    CREATE TABLE recipes (
      recipe_id SERIAL PRIMARY KEY,
      recipe_name TEXT NOT NULL,
      recipe_description TEXT,
      recipe_img_url TEXT,
      created_by INTEGER REFERENCES users(user_id)
    );

    CREATE TABLE ingredients (
      id SERIAL PRIMARY KEY,
      ingredient_name VARCHAR(255) NOT NULL,
      img_url TEXT,
      calories_per_100g INT,
      protein_g_per_100g FLOAT,
      carbs_g_per_100g FLOAT,
      fat_g_per_100g FLOAT,
      fiber_g_per_100g FLOAT,
      sugar_g_per_100g FLOAT
    );

    CREATE TABLE dietary_restrictions (
      restriction_id SERIAL PRIMARY KEY,
      restriction_name TEXT UNIQUE NOT NULL
    );

    CREATE TABLE user_dietary_restrictions (
      user_id INTEGER REFERENCES users(user_id),
      restriction_id INTEGER REFERENCES dietary_restrictions(restriction_id),
      PRIMARY KEY (user_id, restriction_id)
    );


    CREATE TABLE user_cooked_recipes (
      user_id INTEGER REFERENCES users(user_id),
      recipe_id INTEGER REFERENCES recipes(recipe_id),
      PRIMARY KEY (user_id, recipe_id)
    );


    CREATE TABLE user_favorites (
      user_id INTEGER REFERENCES users(user_id),
      recipe_id INTEGER REFERENCES recipes(recipe_id),
      PRIMARY KEY (user_id, recipe_id)
    );


    CREATE TABLE ingredient_dietary_restrictions (
      ingredient_id INTEGER REFERENCES ingredients(id),
      restriction_id INTEGER REFERENCES dietary_restrictions(restriction_id),
      PRIMARY KEY (ingredient_id, restriction_id)
    );

    CREATE TABLE equipment (
      equipment_id SERIAL PRIMARY KEY,
      equipment_name TEXT NOT NULL,
      equipment_img_url TEXT
    );

    CREATE TABLE ingredient_quantities (
      iq_id SERIAL PRIMARY KEY,
      recipe_id INTEGER REFERENCES recipes(recipe_id),
      ingredient_id INTEGER REFERENCES ingredients(id),
      quantity_numerical NUMERIC,
      quantity_unit TEXT,
      optional BOOLEAN DEFAULT false
    );


    CREATE TABLE instructions (
      instruction_id SERIAL PRIMARY KEY,
      recipe_id INTEGER REFERENCES recipes(recipe_id),
      step_number INTEGER NOT NULL,
      step_description TEXT NOT NULL,
      iq_id INTEGER REFERENCES ingredient_quantities(iq_id),
      time_required NUMERIC,
      timed_task BOOLEAN DEFAULT false
    );

    `)}


async function seedUserData() {
  await db.query(
  `
    INSERT INTO users (username) VALUES
      ('Team Cheffy'),
      ('Bryony'),
      ('Nick'),
      ('Marc'),
      ('Vanit'),
      ('Oliver'),
      ('Sara');
  `)
}
async function seedIngredients() {
  await db.query(
  `
    INSERT INTO ingredients (ingredient_name, img_url, calories_per_100g, protein_g_per_100g, carbs_g_per_100g, fat_g_per_100g, fiber_g_per_100g, sugar_g_per_100g) VALUES
      ('chickpeas', 'https://example.jpg', 164, 8.9, 27.4, 2.6, 7.6, 4.8),
      ('onion', 'https://example.jpg', 40, 1.1, 9.3, 0.1, 1.7, 4.2),
      ('garlic', 'https://example.jpg', 149, 6.4, 33.1, 0.5, 2.1, 1.0),
      ('ginger', 'https://example.jpg', 80, 1.8, 18, 0.8, 2.0, 1.7),
      ('tomato', 'https://example.jpg', 18, 0.9, 3.9, 0.2, 1.2, 2.6),
      ('cumin', 'https://example.jpg', 375, 18, 44, 22, 11, 2.3),
      ('coriander', 'https://example.jpg', 23, 2.1, 3.7, 0.5, 2.8, 0.9),
      ('turmeric', 'https://example.jpg', 312, 8, 67, 4.4, 22.7, 3.2),
      ('olive oil', 'https://example.jpg', 884, 0, 0, 100, 0, 0),
      ('basmati rice', 'https://example.jpg', 130, 2.4, 28, 0.3, 0.4, 0.1),
      ('mozzarella', 'https://example.jpg', 280, 28, 3.1, 17, 0, 0.5),
      ('pepperoni', 'https://example.jpg', 494, 22, 1.8, 44, 0, 0),
      ('basil', 'https://example.jpg', 23, 3.2, 2.7, 0.6, 1.6, 0.3),
      ('pasta', 'https://example.jpg', 131, 5, 25, 1.1, 1.3, 0.8),
      ('milk', 'https://example.jpg', 42, 3.4, 5, 1, 0, 5),
      ('butter', 'https://example.jpg', 717, 0.9, 0.1, 81, 0, 0.1),
      ('cheddar', 'https://example.jpg', 403, 25, 1.3, 33, 0, 0.5),
      ('tortilla', 'https://example.jpg', 237, 6.8, 42, 4.7, 3.6, 1.2),
      ('black beans', 'https://example.jpg', 339, 21, 62, 0.9, 16.6, 0.3),
      ('avocado', 'https://example.jpg', 160, 2, 9, 15, 7, 0.7),
      ('lime', 'https://example.jpg', 30, 0.7, 11, 0.2, 2.8, 1.7),
      ('soy sauce', 'https://example.jpg', 53, 8, 4.9, 0, 0.4, 0.4),
      ('tofu', 'https://example.jpg', 76, 8, 1.9, 4.8, 0.3, 0.3),
      ('broccoli', 'https://example.jpg', 34, 2.8, 7, 0.4, 2.6, 1.7),
      ('carrot', 'https://example.jpg', 41, 0.9, 10, 0.2, 2.8, 4.7),
      ('gluten-free flour', 'https://example.jpg', 366, 10, 76, 1.4, 6, 1.5),
      ('coconut milk', 'https://example.jpg', 230, 2.3, 6, 24, 2.2, 3.3),
      ('chilli pepper', 'https://example.jpg', 40, 2, 9, 0.4, 1.5, 5.3);
  `)
}

async function seedRecipes() {
  await db.query(
  `
    INSERT INTO recipes (recipe_name, recipe_description, recipe_img_url, created_by) VALUES
    ('Chana Masala', 'Spiced chickpeas in a tomato-based curry', 'https://example.jpg', 1),
    ('Pepperoni Pizza', 'Classic pizza topped with pepperoni and cheese', 'https://example.jpg', 1),
    ('Vegan Tofu Stir-Fry', 'Crispy tofu with vegetables and soy sauce', 'https://example.jpg', 1),
    ('Gluten-Free Pancakes', 'Fluffy pancakes made with gluten-free flour', 'https://example.jpg', 1),
    ('Vegan Tacos', 'Tacos with black beans, avocado, and lime', 'https://example.jpg', 1);
  `)
}

async function seedDietaryRestrictions() {
  await db.query(
    `
    INSERT INTO dietary_restrictions (restriction_name) VALUES
      ('vegetarian'),
      ('vegan'),
      ('gluten-free'),
      ('dairy-free'),
      ('nut-free');

      INSERT INTO user_dietary_restrictions (user_id, restriction_id) VALUES
    (1, 1),
    (1, 3),
    (2, 2),
    (2, 5),
    (3, 1),
    (3, 4),
    (3, 5),
    (4, 3),
    (5, 2),
    (5, 4);
`
  )}

async function seedUserAdditionalData() {
    await db.query(
      `
      INSERT INTO user_cooked_recipes (user_id, recipe_id) VALUES
      (1, 1),
      (1, 3),
      (2, 2),
      (2, 4),
      (3, 1),
      (3, 5),
      (4, 3),
      (5, 4),
      (5, 5);

      INSERT INTO user_favorites (user_id, recipe_id) VALUES
      (1, 2),
      (1, 5),
      (2, 1),
      (3, 4),
      (3, 5),
      (4, 2),
      (4, 3),
      (5, 1),
      (5, 3);
      `
    )}

async function seedIngredientDietRestrictions() {
      await db.query(
        `
        INSERT INTO ingredient_dietary_restrictions (ingredient_id, restriction_id) VALUES
        (1, 1), -- chickpeas vegan
        (1, 3), -- chickpeas gluten-free
        (1, 4), -- chickpeas dairy-free
        (2, 1), -- onion vegan
        (2, 3), -- onion gluten-free
        (2, 4), -- onion dairy-free
        (3, 1), -- garlic vegan
        (3, 3), -- garlic gluten-free
        (3, 4), -- garlic dairy-free
        (4, 1), -- ginger vegan
        (4, 3), -- ginger gluten-free
        (4, 4), -- ginger dairy-free
        (5, 1), -- tomato vegan
        (5, 3), -- tomato gluten-free
        (5, 4), -- tomato dairy-free
        (6, 1), -- cumin vegan
        (6, 3), -- cumin gluten-free
        (6, 4), -- cumin dairy-free
        (7, 1), -- coriander vegan
        (7, 3), -- coriander gluten-free
        (7, 4), -- coriander dairy-free
        (8, 1), -- turmeric vegan
        (8, 3), -- turmeric gluten-free
        (8, 4), -- turmeric dairy-free
        (9, 1), -- olive oil vegan
        (9, 3), -- olive oil gluten-free
        (9, 4), -- olive oil dairy-free
        (10, 1), -- basmati rice vegan
        (10, 3), -- basmati rice gluten-free
        (10, 4), -- basmati rice dairy-free
        (11, 4), -- mozzarella dairy (not vegan)
        (13, 1), -- basil vegan
        (13, 3), -- basil gluten-free
        (13, 4), -- basil dairy-free
        (14, 4), -- pasta contains gluten (not gluten-free)
        (15, 4), -- milk dairy (not vegan)
        (16, 4), -- butter dairy (not vegan)
        (17, 4), -- cheddar dairy (not vegan)
        (18, 1), -- tortilla vegan
        (18, 4), -- tortilla dairy-free
        (19, 1), -- black beans vegan
        (19, 3), -- black beans gluten-free
        (19, 4), -- black beans dairy-free
        (20, 1), -- avocado vegan
        (20, 3), -- avocado gluten-free
        (20, 4), -- avocado dairy-free
        (21, 1), -- lime vegan
        (21, 3), -- lime gluten-free
        (21, 4), -- lime dairy-free
        (22, 1), -- soy sauce vegan (though watch gluten in some brands)
        (22, 4), -- soy sauce dairy-free
        (23, 1), -- tofu vegan
        (23, 3), -- tofu gluten-free
        (23, 4), -- tofu dairy-free
        (24, 1), -- broccoli vegan
        (24, 3), -- broccoli gluten-free
        (24, 4), -- broccoli dairy-free
        (25, 1), -- carrot vegan
        (25, 3), -- carrot gluten-free
        (25, 4), -- carrot dairy-free
        (26, 1), -- gluten-free flour vegan
        (26, 3), -- gluten-free flour gluten-free
        (26, 4), -- gluten-free flour dairy-free
        (27, 1), -- coconut milk vegan
        (27, 3), -- coconut milk gluten-free
        (27, 4), -- coconut milk dairy-free
        (28, 1), -- chilli pepper vegan
        (28, 3), -- chilli pepper gluten-free
        (28, 4); -- chilli pepper dairy-free
      
        `
      )}
    
async function seedIngredientQuantities() {
  await db.query(
    `

    INSERT INTO ingredient_quantities (recipe_id, ingredient_id, quantity_numerical, quantity_unit, optional) VALUES
    -- Chana Masala
    (1, 1, 250, 'grams', false),    -- chickpeas
    (1, 5, 150, 'grams', false),    -- tomato
    (1, 2, 1, 'piece', false),      -- onion
    (1, 3, 3, 'cloves', false),     -- garlic
    (1, 6, 1, 'teaspoon', false),   -- cumin
    (1, 8, 0.5, 'teaspoon', false), -- turmeric
    (1, 9, 2, 'tablespoons', false), -- olive oil
  
    -- Pepperoni Pizza
    (2, 14, 200, 'grams', false),   -- pasta (dough)
    (2, 12, 100, 'grams', false),   -- pepperoni
    (2, 11, 150, 'grams', false),   -- mozzarella
    (2, 13, 5, 'grams', true),      -- basil (optional)
    (2, 16, 10, 'grams', true),     -- butter (optional)
  
    -- Vegan Tofu Stir-Fry
    (3, 23, 200, 'grams', false),   -- tofu
    (3, 24, 100, 'grams', false),   -- broccoli
    (3, 22, 30, 'ml', false),       -- soy sauce
    (3, 4, 10, 'grams', true),      -- ginger (optional)
    (3, 3, 2, 'cloves', false),     -- garlic
  
    -- Gluten-Free Pancakes
    (4, 26, 150, 'grams', false),   -- gluten-free flour
    (4, 15, 200, 'ml', false),      -- milk
    (4, 16, 50, 'grams', false),    -- butter
    (4, 21, 1, 'piece', true),      -- lime (optional)
  
    -- Vegan Tacos
    (5, 19, 150, 'grams', false),   -- black beans
    (5, 20, 100, 'grams', false),   -- avocado
    (5, 21, 1, 'piece', false),     -- lime
    (5, 18, 3, 'pieces', false),    -- tortilla
    (5, 28, 1, 'piece', true);      -- chilli pepper (optional)
  
  
  
  
  `)
}

async function seedInstructions() {
  await db.query(
  `

  INSERT INTO instructions (recipe_id, step_number, step_description, iq_id, time_required, timed_task) VALUES
  -- Chana Masala (recipe_id 1)
  (1, 1, 'Heat olive oil in a pan.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 1 AND ingredient_id = 9), 2, TRUE),
  (1, 2, 'Add chopped onion and sauté until translucent.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 1 AND ingredient_id = 2), 5, TRUE),
  (1, 3, 'Add minced garlic and grated ginger. Cook for 1 minute.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 1 AND ingredient_id = 3), 1, TRUE),
  (1, 4, 'Stir in cumin, coriander and turmeric. Cook spices for 30 seconds.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 1 AND ingredient_id = 6), 0.5, TRUE),
  (1, 5, 'Add chopped tomatoes and cook until soft.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 1 AND ingredient_id = 5), 7, TRUE),
  (1, 6, 'Add chickpeas and simmer for 15–20 minutes.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 1 AND ingredient_id = 1), 20, TRUE),
  (1, 7, 'Adjust salt and spices to taste. Serve hot with rice or naan.', NULL, NULL, FALSE),
  
  -- Pepperoni Pizza (recipe_id 2)
  (2, 1, 'Cook pasta according to package instructions. Drain and set aside.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 2 AND ingredient_id = 14), 10, TRUE),
  (2, 2, 'Heat olive oil in a pan over medium heat.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 2 AND ingredient_id = 9), 2, TRUE),
  (2, 3, 'Add minced garlic and chopped tomatoes. Cook until tomatoes soften.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 2 AND ingredient_id = 3), 6, TRUE),
  (2, 4, 'Add sliced pepperoni and stir for 2 minutes.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 2 AND ingredient_id = 12), 2, TRUE),
  (2, 5, 'Toss in the cooked pasta and stir to coat.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 2 AND ingredient_id = 14), 1, TRUE),
  (2, 6, 'Add fresh mozzarella and torn basil leaves. Stir gently.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 2 AND ingredient_id = 11), 1, TRUE),
  (2, 7, 'Serve warm.', NULL, NULL, FALSE),
  
  -- Vegan Tofu Stir-Fry (recipe_id 3)
  (3, 1, 'Cut tofu into cubes and pan-fry until golden.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 3 AND ingredient_id = 23), 7, TRUE),
  (3, 2, 'Remove tofu and set aside.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 3 AND ingredient_id = 23), 1, TRUE),
  (3, 3, 'In the same pan, add garlic and ginger, sauté briefly.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 3 AND ingredient_id = 3), 1, TRUE),
  (3, 4, 'Add chopped broccoli and carrot. Stir-fry until tender-crisp.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 3 AND ingredient_id = 24), 6, TRUE),
  (3, 5, 'Add tofu back to pan.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 3 AND ingredient_id = 23), NULL, FALSE),
  (3, 6, 'Add soy sauce and toss everything together for 1–2 minutes.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 3 AND ingredient_id = 22), 2, TRUE),
  (3, 7, 'Serve hot.', NULL, NULL, FALSE),
  
  -- Gluten-Free Pancakes (recipe_id 4)
  (4, 1, 'Mix gluten-free flour, milk, and melted butter into a batter.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 4 AND ingredient_id = 26), 5, TRUE),
  (4, 2, 'Heat a lightly oiled griddle or pan over medium-high heat.', NULL, 2, TRUE),
  (4, 3, 'Pour about 1/4 cup of batter onto the griddle.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 4 AND ingredient_id = 26), NULL, FALSE),
  (4, 4, 'Cook until bubbles form and edges are dry, about 2–3 minutes.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 4 AND ingredient_id = 26), 3, TRUE),
  (4, 5, 'Flip and cook the other side until golden.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 4 AND ingredient_id = 26), 2, TRUE),
  (4, 6, 'Serve warm with toppings of choice.', NULL, NULL, FALSE),
  
  -- Vegan Tacos (recipe_id 5)
  (5, 1, 'Warm tortillas in a pan or oven.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 5 AND ingredient_id = 18), 2, TRUE),
  (5, 2, 'Heat black beans in a saucepan with a pinch of salt.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 5 AND ingredient_id = 19), 5, TRUE),
  (5, 3, 'Slice avocado and chop coriander and chilli pepper.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 5 AND ingredient_id = 20), 4, TRUE),
  (5, 4, 'Fill each tortilla with beans, avocado, coriander and chilli.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 5 AND ingredient_id = 18), 3, TRUE),
  (5, 5, 'Squeeze fresh lime juice on top and serve.', (SELECT iq_id FROM ingredient_quantities WHERE recipe_id = 5 AND ingredient_id = 21), NULL, FALSE);
  
  `)
}


async function runSeeds() {
  try {
    await createTables();
    await seedUserData();
    await seedIngredients();
    await seedRecipes();
    await seedDietaryRestrictions();
    await seedUserAdditionalData();
    await seedIngredientDietRestrictions();
    await seedIngredientQuantities();
    await seedInstructions();
    console.log('All seed data inserted');
  } catch (err) {
    console.error('Error seeding data:', err);
  } 
}

runSeeds();

module.exports = runSeeds;

