module.exports = (sequelize, Sequelize) => {
  const reward = sequelize.define("reward", {
    rewardId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    rewardName: { type: Sequelize.STRING },
    rewardCondition: { type: Sequelize.STRING },
    rewardPoints: { type: Sequelize.INTEGER },
    rewardStatus: { type: Sequelize.BOOLEAN, defaultValue: false },
  });
  return reward;
};
