const express = require('express');
const router = express.Router();

const recipeController = require('../app/controllers/RecipeController');
const restrict = require('../app/middlewares/AuthMiddleware');

router.post('/comment/:slug', restrict, recipeController.comment);
router.get('/recipe-item/:slug', recipeController.post);
router.get('/:slug', recipeController.show);
router.get('/', recipeController.index);

module.exports = router;