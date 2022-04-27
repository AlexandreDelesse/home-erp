const user = require("../controllers/user.controller");

module.exports = (app) => {
  const router = require("express").Router();

  router.post("/user", user.create);
  router.get("/user/:id", user.findByPk);
  router.delete("/user/:id", user.deleteByPk);

  app.use("/api", router);
};
