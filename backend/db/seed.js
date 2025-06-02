const db = require('./connection');
require('dotenv').config();

async function seedUserData() {
  await db.query(
  `

  `)
}
async function seedIngredients() {
  await db.query(
  `

  `)
}

async function seedRecipes() {
  await db.query(
  `

  `)
}

async function seedIngredientQuantities() {
  await db.query(
    `

  `)
}

async function seedInstructions() {
  await db.query(
  `

  `)
}


async function runSeeds() {
  try {
    await seedUserData();
    await seedIngredients();
    await seedRecipes();
    await seedIngredientQuantities();
    await seedInstructions();
    console.log('All seed data inserted');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    db.end();
  }
}

runSeeds();
