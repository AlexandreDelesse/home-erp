module.exports = (sequelize, Sequelize) => {
  const activity = sequelize.define('activity', {
    duration: { type: Sequelize.INTEGER, defaultValue: null },
  })
  return activity
}
