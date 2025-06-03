CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL
);

CREATE TABLE recipes (
  recipe_id SERIAL PRIMARY KEY,
  recipe_name TEXT NOT NULL,
  recipe_description TEXT,
  recipe_img_url TEXT,
  created_by INTEGER REFERENCES users(user_id),
  is_vegetarian BOOLEAN DEFAULT FALSE,
  is_vegan BOOLEAN DEFAULT FALSE,
  is_gluten_free BOOLEAN DEFAULT FALSE,
  is_dairy_free BOOLEAN DEFAULT FALSE,
  is_nut_free BOOLEAN DEFAULT FALSE
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