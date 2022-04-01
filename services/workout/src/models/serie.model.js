module.exports = (sequelize, Sequelize) => {
  const serie = sequelize.define("serie", {
    weight: { type: Sequelize.INTEGER, defaultValue: 0 },
    reps: { type: Sequelize.INTEGER },
  });
  return serie;
};
