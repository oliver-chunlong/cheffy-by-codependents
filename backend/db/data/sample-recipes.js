//DO NOT USE THIS FILE
//THIS IS AN OLD VERSION THAT IS NOT FACT CHECKED
//POSSIBLY INCOMPATIBLE WITH DB AND CAN CAUSE ERRORS
//ALSO ITS THE WRONG FILE FORMAT

INSERT INTO ingredients (id, name, img_url, calories_per_100g, protein_g_per_100g, carbs_g_per_100g, fat_g_per_100g, fiber_g_per_100g, sugar_g_per_100g) VALUES
(1, 'chickpeas', 'https://example.jpg', 164, 8.9, 27.4, 2.6, 7.6, 4.8),
(2, 'onion', 'https://example.jpg', 40, 1.1, 9.3, 0.1, 1.7, 4.2),
(3, 'garlic', 'https://example.jpg', 149, 6.4, 33.1, 0.5, 2.1, 1.0),
(4, 'ginger', 'https://example.jpg', 80, 1.8, 18, 0.8, 2.0, 1.7),
(5, 'tomato', 'https://example.jpg', 18, 0.9, 3.9, 0.2, 1.2, 2.6),
(6, 'cumin', 'https://example.jpg', 375, 18, 44, 22, 11, 2.3),
(7, 'coriander', 'https://example.jpg', 23, 2.1, 3.7, 0.5, 2.8, 0.9),
(8, 'turmeric', 'https://example.jpg', 312, 8, 67, 4.4, 22.7, 3.2),
(9, 'olive oil', 'https://example.jpg', 884, 0, 0, 100, 0, 0),
(10, 'basmati rice', 'https://example.jpg', 130, 2.4, 28, 0.3, 0.4, 0.1),
(11, 'mozzarella', 'https://example.jpg', 280, 28, 3.1, 17, 0, 0.5),
(12, 'pepperoni', 'https://example.jpg', 494, 22, 1.8, 44, 0, 0),
(13, 'basil', 'https://example.jpg', 23, 3.2, 2.7, 0.6, 1.6, 0.3),
(14, 'pasta', 'https://example.jpg', 131, 5, 25, 1.1, 1.3, 0.8),
(15, 'milk', 'https://example.jpg', 42, 3.4, 5, 1, 0, 5),
(16, 'butter', 'https://example.jpg', 717, 0.9, 0.1, 81, 0, 0.1),
(17, 'cheddar', 'https://example.jpg', 403, 25, 1.3, 33, 0, 0.5),
(18, 'tortilla', 'https://example.jpg', 237, 6.8, 42, 4.7, 3.6, 1.2),
(19, 'black beans', 'https://example.jpg', 339, 21, 62, 0.9, 16.6, 0.3),
(20, 'avocado', 'https://example.jpg', 160, 2, 9, 15, 7, 0.7),
(21, 'lime', 'https://example.jpg', 30, 0.7, 11, 0.2, 2.8, 1.7),
(22, 'soy sauce', 'https://example.jpg', 53, 8, 4.9, 0, 0.4, 0.4),
(23, 'tofu', 'https://example.jpg', 76, 8, 1.9, 4.8, 0.3, 0.3),
(24, 'broccoli', 'https://example.jpg', 34, 2.8, 7, 0.4, 2.6, 1.7),
(25, 'carrot', 'https://example.jpg', 41, 0.9, 10, 0.2, 2.8, 4.7),
(26, 'gluten-free flour', 'https://example.jpg', 366, 10, 76, 1.4, 6, 1.5),
(27, 'coconut milk', 'https://example.jpg', 230, 2.3, 6, 24, 2.2, 3.3),
(28, 'chilli pepper', 'https://example.jpg', 40, 2, 9, 0.4, 1.5, 5.3);

INSERT INTO cuisines (id, name) VALUES 
(1, 'Indian'),
(2, 'Italian'),
(3, 'Chinese'),
(4, 'American'),
(5, 'Mexican');

INSERT INTO dietary_requirements (ingredient_id, name, contains_meat, contains_dairy, contains_gluten, contains_nuts, contains_fish, contains_eggs, contains_other_animal_products) VALUES
(1, 'chickpeas', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
(2, 'onion', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
(3, 'garlic', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
(4, 'ginger', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
(5, 'tomato', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
(6, 'cumin', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
(7, 'coriander', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
(8, 'turmeric', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
(9, 'olive oil', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
(10, 'basmati rice', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
(11, 'mozzarella', FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE),
(12, 'pepperoni', TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE),
(13, 'basil', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
(14, 'pasta', FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE),
(15, 'milk', FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE),
(16, 'butter', FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE),
(17, 'cheddar', FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE),
(18, 'tortilla', FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE),
(19, 'black beans', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
(20, 'avocado', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
(21, 'lime', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
(22, 'soy sauce', FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE),
(23, 'tofu', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
(24, 'broccoli', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
(25, 'carrot', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
(26, 'gluten-free flour', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
(27, 'coconut milk', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE),
(28, 'chilli pepper', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE);

INSERT INTO equipment (id, name) VALUES
(1, 'pan'),
(2, 'griddle'),
(3, 'oven'),
(4, 'saucepan');

INSERT INTO recipes (id, name, cuisine, description, img_url, created_by) VALUES
(1, 'Chana Masala', 1, 'Spiced chickpeas in a tomato-based curry', 'https://example.jpg', 'Team Cheffy'),
(2, 'Pepperoni Pizza', 2, 'Classic pizza topped with pepperoni and cheese', 'https://example.jpg', 'Team Cheffy'),
(3, 'Vegan Tofu Stir-Fry', 3, 'Crispy tofu with vegetables and soy sauce', 'https://example.jpg', 'Team Cheffy'),
(4, 'Gluten-Free Pancakes', 4, 'Fluffy pancakes made with gluten-free flour', 'https://example.jpg', 'Team Cheffy'),
(5, 'Vegan Tacos', 5, 'Tacos with black beans, avocado, and lime', 'https://example.jpg', 'Team Cheffy');

INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity_number, quantity_unit, is_optional) VALUES
(1, 1, 320, 'g', FALSE),
(1, 2, 1, ' medium', FALSE),
(1, 3, 2, ' cloves of', FALSE),
(1, 4, 1, ' inch of', TRUE),
(1, 5, 2, '', FALSE),
(1, 6, 1, 'tsp', FALSE),
(1, 7, 1, 'tsp', TRUE),
(1, 8, 0.5, 'tsp', TRUE),
(1, 9, 30, 'ml', TRUE),

(2, 14, 200, 'g', FALSE),
(2, 5, 2, '', FALSE),
(2, 3, 2, ' cloves of', FALSE),
(2, 11, 100, 'g', FALSE),
(2, 12, 50, 'g', TRUE),
(2, 13, 10, ' leaves of', TRUE),
(2, 9, 30, 'ml', TRUE),

(3, 23, 200, 'g', FALSE),
(3, 22, 30, 'ml', FALSE),
(3, 24, 150, 'g', FALSE),
(3, 25, 120, 'g', FALSE),
(3, 3, 1, ' clove of', TRUE),
(3, 4, 1, ' inch of', TRUE),

(4, 26, 120, 'g', FALSE),
(4, 15, 240, 'ml', FALSE),
(4, 16, 30, 'g', FALSE),
(4, 17, 15, 'g', TRUE),

(5, 18, 4, ' small', FALSE),
(5, 19, 170, 'g', FALSE),
(5, 20, 1, ' sliced', TRUE),
(5, 21, 0.5, '', TRUE),
(5, 28, 1, '', TRUE),
(5, 7, NULL, ' few leaves of', TRUE);

INSERT INTO instructions (recipe_id, step_id, step_description, recipe_ingredient_id, equipment_id, step_duration_in_min, needs_timer) VALUES
(1, 1, 'Heat olive oil in a pan.', 9, 1, 2, TRUE),
(1, 2, 'Add chopped onion and sauté until translucent.', 2, 1, 5, TRUE),
(1, 3, 'Add minced garlic and grated ginger. Cook for 1 minute.', 3, 1, 1, TRUE),
(1, 4, 'Stir in cumin, coriander and turmeric. Cook spices for 30 seconds.', 6, 1, 0.5, TRUE),
(1, 5, 'Add chopped tomatoes and cook until soft.', 5, 1, 7, TRUE),
(1, 6, 'Add chickpeas and simmer for 15–20 minutes.', 1, 1, 20, TRUE),
(1, 7, 'Adjust salt and spices to taste. Serve hot with rice or naan.', NULL, NULL, NULL, FALSE),

(2, 1, 'Cook pasta according to package instructions. Drain and set aside.', 10, 2, 10, TRUE),
(2, 2, 'Heat olive oil in a pan over medium heat.', 14, 1, 2, TRUE),
(2, 3, 'Add minced garlic and chopped tomatoes. Cook until tomatoes soften.', 11, 1, 6, TRUE),
(2, 4, 'Add sliced pepperoni and stir for 2 minutes.', 13, 1, 2, TRUE),
(2, 5, 'Toss in the cooked pasta and stir to coat.', 10, 1, 1, TRUE),
(2, 6, 'Add fresh mozzarella and torn basil leaves. Stir gently.', 12, 1, 1, TRUE),
(2, 7, 'Serve warm.', NULL, NULL, NULL, FALSE),

(3, 1, 'Cut tofu into cubes and pan-fry until golden.', 15, 1, 7, TRUE),
(3, 2, 'Remove tofu and set aside.', 15, NULL, 1, TRUE),
(3, 3, 'In the same pan, add garlic and ginger, sauté briefly.', 16, 1, 1, TRUE),
(3, 4, 'Add chopped broccoli and carrot. Stir-fry until tender-crisp.', 17, 1, 6, TRUE),
(3, 5, 'Add tofu back to pan.', 15, 1, NULL, FALSE),
(3, 6, 'Add soy sauce and toss everything together for 1–2 minutes.', 14, 1, 2, TRUE),
(3, 7, 'Serve hot.', NULL, NULL, NULL, FALSE),

(4, 1, 'Mix gluten-free flour, milk, and melted butter into a batter.', 18, 3, 5, TRUE),
(4, 2, 'Heat a lightly oiled griddle or pan over medium-high heat.', NULL, 1, 2, TRUE),
(4, 3, 'Pour about 1/4 cup of batter onto the griddle.', 18, 1, NULL, FALSE),
(4, 4, 'Cook until bubbles form and edges are dry, about 2–3 minutes.', 18, 1, 3, TRUE),
(4, 5, 'Flip and cook the other side until golden.', 18, 1, 2, TRUE),
(4, 6, 'Serve warm with toppings of choice.', NULL, NULL, NULL, FALSE),

(5, 1, 'Warm tortillas in a pan or oven.', 22, 1, 2, TRUE),
(5, 2, 'Heat black beans in a saucepan with a pinch of salt.', 23, 2, 5, TRUE),
(5, 3, 'Slice avocado and chop coriander and chilli pepper.', 24, 4, 4, TRUE),
(5, 4, 'Fill each tortilla with beans, avocado, coriander and chilli.', 22, NULL, 3, TRUE),
(5, 5, 'Squeeze fresh lime juice on top and serve.', 25, NULL, NULL, FALSE);

INSERT INTO recipe_cuisines (recipe_id, cuisine_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);