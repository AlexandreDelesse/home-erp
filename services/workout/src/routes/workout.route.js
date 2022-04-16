const workout = require('../controllers/workout.controller')
const activity = require('../controllers/activity.controller')

module.exports = (app) => {
  const router = require('express').Router()

  // Workout
  router.post('/workouts', workout.create)
  router.get('/workouts', workout.findAll)
  router.get('/workouts/:id', workout.findById)
  router.delete('/workouts/:id', workout.deleteById)
  router.patch('/workouts/:id', workout.updateById)

  // Exercice
  router.get('/exercices', workout.findAllExercices)
  router.get('/activities', activity.findAll)
  router.post('/exercices', workout.createExercice)
  router.post('/workouts/:id/activity', activity.createActivity)
  //   router.get("/workouts/categories", reward.findAllCategories);

  //   router.patch("/workouts/:id", reward.update);

  //   router.delete("/workouts/all", reward.deleteAll);
  router.delete('/activities/:id', activity.deleteById)

  app.use('/api', router)
}
