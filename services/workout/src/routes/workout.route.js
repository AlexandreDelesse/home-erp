const workout = require("../controllers/workout.controller");

module.exports = (app) => {
  const router = require("express").Router();

  router.post("/workouts", workout.create);
  router.post("/exercices", workout.createExercice);

  router.get("/workouts", workout.findAll);
  router.get("/exercices", workout.findAllExercices);
  //   router.get("/workouts/categories", reward.findAllCategories);

  //   router.patch("/workouts/:id", reward.update);

  //   router.delete("/workouts/all", reward.deleteAll);
    router.delete("/workouts/:id", workout.deleteById);

  app.use("/api", router);
};
