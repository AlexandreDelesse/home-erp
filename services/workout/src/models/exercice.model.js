module.exports = (sequelize, Sequelize) => {
  const exercice = sequelize.define('exercice', {
    name: { type: Sequelize.STRING },
    bodyParts: { type: Sequelize.JSON, defaultValue: [] },
    type: { type: Sequelize.STRING },
    category: { type: Sequelize.STRING },
  })
  return exercice
}
