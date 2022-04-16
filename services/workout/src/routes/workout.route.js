const workout = require('../controllers/workout.controller')
const activity = require('../controllers/activity.controller')
const exercice = require('../controllers/exercice.controller')

module.exports = (app) => {
  const router = require('express').Router()

  // Workout
  router.post('/workouts', workout.create)
  router.get('/workouts', workout.findAll)
  router.get('/workouts/:id', workout.findById)
  router.delete('/workouts/:id', workout.deleteById)
  router.patch('/workouts/:id', workout.updateById)

  // Exercice
  router.post('/exercices', exercice.create)
  router.get('/exercices', exercice.findAll)
  router.get('/exercices/:id', exercice.findById)
  router.delete('/exercices/:id', exercice.deleteById)
  router.patch('/exercices/:id', exercice.updateById)

  // Activity
  router.post('/activities', activity.create)
  router.get('/activities', activity.findAll)
  router.get('/activities/:id', activity.findById)
  router.delete('/activities/:id', activity.deleteById)
  router.patch('/activities/:id', activity.updateById)

  app.use('/api', router)
}
