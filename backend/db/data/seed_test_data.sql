INSERT INTO users (username) VALUES
  ('Team Cheffy'),
  ('Bryony'),
  ('Nick'),
  ('Marc'),
  ('Vanit'),
  ('Oliver'),
  ('Sara');

INSERT INTO recipes (recipe_name, recipe_description, recipe_img_url, created_by) VALUES
('Chana Masala', 'Spiced chickpeas in a tomato-based curry', 'https://example.jpg', 1),
('Pepperoni Pizza', 'Classic pizza topped with pepperoni and cheese', 'https://example.jpg', 1),
('Vegan Tofu Stir-Fry', 'Crispy tofu with vegetables and soy sauce', 'https://example.jpg', 1),
('Fluffy Pancakes', 'Fluffy pancakes that everyone will love', 'https://example.jpg', 1),
('Vegan Tacos', 'Tacos with black beans, avocado, and lime', 'https://example.jpg', 5);
  
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
  ('flour', 'https://example.jpg', 366, 10, 76, 1.4, 6, 1.5),
  ('coconut milk', 'https://example.jpg', 230, 2.3, 6, 24, 2.2, 3.3),
  ('chilli pepper', 'https://example.jpg', 40, 2, 9, 0.4, 1.5, 5.3);
  
  
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

INSERT INTO user_favourites (user_id, recipe_id) VALUES
(1, 2),
(1, 5),
(2, 1),
(3, 4),
(3, 5),
(4, 2),
(4, 3),
(5, 1),
(5, 3);

INSERT INTO ingredient_dietary_restrictions (ingredient_id, restriction_id) VALUES
(1,1),(1,2),(1,4),(1,5),
(2,1),(2,2),(2,4),(2,5),
(3,1),(3,2),(3,4),(3,5),
(4,1),(4,2),(4,4),(4,5),
(5,1),(5,2),(5,4),(5,5),
(6,1),(6,2),(6,4),(6,5),
(7,1),(7,2),(7,4),(7,5),
(8,1),(8,2),(8,4),(8,5),
(9,1),(9,2),(9,4),(9,5),
(10,1),(10,2),(10,4),(10,5),
(11,1),(11,5),
(12,4),(12,5),
(13,1),(13,2),(13,4),(13,5),
(14,1),(14,2),(14,4),(14,5),
(15,1),(15,5),
(16,1),(16,5),
(17,1),(17,5),
(18,1),(18,2),(18,4),(18,5),
(19,1),(19,2),(19,4),(19,5),
(20,1),(20,2),(20,4),(20,5),
(21,1),(21,2),(21,4),(21,5),
(22,1),(22,2),(22,4),(22,5),
(23,1),(23,2),(23,4),(23,5),
(24,1),(24,2),(24,4),(24,5),
(25,1),(25,2),(25,4),(25,5),
(26,1),(26,2),(26,3),(26,4),(26,5),
(27,1),(27,2),(27,4),(27,5),
(28,1),(28,2),(28,4),(28,5);
  
    
INSERT INTO equipment (equipment_name) VALUES
('pan'),
('griddle'),
('oven'),
('saucepan');


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

  -- Fluffy Pancakes
  (4, 26, 150, 'grams', false),   -- flour
  (4, 15, 200, 'ml', false),      -- milk
  (4, 16, 50, 'grams', false),    -- butter
  (4, 21, 1, 'piece', true),      -- lime (optional)

  -- Vegan Tacos
  (5, 19, 150, 'grams', false),   -- black beans
  (5, 20, 100, 'grams', false),   -- avocado
  (5, 21, 1, 'piece', false),     -- lime
  (5, 18, 3, 'pieces', false),    -- tortilla
  (5, 28, 1, 'piece', true);      -- chilli pepper (optional)




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

-- Pancakes (recipe_id 4)
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
