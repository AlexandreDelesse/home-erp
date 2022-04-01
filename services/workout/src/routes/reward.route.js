const reward = require("../controllers/reward.controller");

module.exports = (app) => {
  const router = require("express").Router();

  router.post("/rewards", reward.create);

  router.get("/rewards", reward.findAll);
  router.get("/rewards/categories", reward.findAllCategories);

  router.patch("/rewards/:id", reward.update);

  router.delete("/rewards/all", reward.deleteAll);
  router.delete("/rewards/:id", reward.deleteById);

  app.use("/api", router);
};
