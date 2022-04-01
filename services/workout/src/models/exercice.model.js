module.exports = (sequelize, Sequelize) => {
  const exercice = sequelize.define("exercice", {
    name: { type: Sequelize.STRING },
    categories: { type: Sequelize.JSON, defaultValue: [] },
  });
  return exercice;
};
