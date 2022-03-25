const { reward } = require('../models');

module.exports = (app) => {
    const activity = require('../controllers/reward.controller');
  
    const router = require('express').Router();
  
    router.post('/rewards', reward.create);
    router.get('/rewards', reward.findAll);
    router.delete('/rewards/:id', reward.deleteById);
    router.delete('/rewards/all', reward.deleteAll)
  
    app.use('/api', router);
  }