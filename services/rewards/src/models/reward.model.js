module.exports = (sequelize, Sequelize) => {
  const reward = sequelize.define("reward", {
    condition: { type: Sequelize.STRING },
    points: { type: Sequelize.INTEGER, defaultValue: 0 },
    status: { type: Sequelize.BOOLEAN, defaultValue: false },
    category: { type: Sequelize.STRING, defaultValue: "" },
    subCategory: { type: Sequelize.STRING, defaultValue: "" },
  });
  return reward;
};
