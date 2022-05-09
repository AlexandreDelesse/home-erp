module.exports = (sequelize, Sequelize) => {
  const workout = sequelize.define("workout", {
    name: { type: Sequelize.STRING },
    type: { type: Sequelize.ENUM("workout", "training") },
    userId: { type: Sequelize.STRING },
  });
  return workout;
};
