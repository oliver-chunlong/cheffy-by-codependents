const express = require('express');
const router = express.Router();
const dietaryController = require("../controllers/recipes.controller");

router.post('/getDietaryFlags', dietaryController.getDietaryFlags);

module.exports = router;