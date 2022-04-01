const { recipe } = require('../models');

module.exports = (app) => {
    const activity = require('../controllers/recipe.controller');
  
    const router = require('express').Router();
  
    router.post('/recipes', recipe.create);
    router.get('/recipes', recipe.findAll);
    router.delete('/recipes/:id', recipe.deleteById);
    router.delete('/recipes/all', recipe.deleteAll)
  
    app.use('/api', router);
  }