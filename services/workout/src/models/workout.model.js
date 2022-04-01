module.exports = (sequelize, Sequelize) => {
  const workout = sequelize.define("workout", {
    date: { type: Sequelize.STRING, defaultValue: new Date().toISOString() },
  });
  return workout;
};
