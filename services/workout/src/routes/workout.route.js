const workout = require("../controllers/workout.controller");
const activity = require("../controllers/activity.controller");

module.exports = (app) => {
  const router = require("express").Router();

  router.post("/workouts", workout.create);
  router.post("/exercices", workout.createExercice);
  router.post("/workouts/:id/activity", activity.createActivity);

  router.get("/workouts", workout.findAll);
  router.get("/exercices", workout.findAllExercices);
  router.get("/activities", activity.findAll);
  //   router.get("/workouts/categories", reward.findAllCategories);

  //   router.patch("/workouts/:id", reward.update);

  //   router.delete("/workouts/all", reward.deleteAll);
  router.delete("/workouts/:id", workout.deleteById);

  app.use("/api", router);
};
