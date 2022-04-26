module.exports = (sequelize, Sequelize) => {
  const exercice = sequelize.define("exercice", {
    name: { type: Sequelize.STRING },
    variant: { type: Sequelize.STRING, defaultValue: null },
    difficulty: { type: Sequelize.STRING, defaultValue: null },
    category: { type: Sequelize.STRING, defaultValue: null },
    type: { type: Sequelize.STRING, defaultValue: null },
  });
  return exercice;
};
