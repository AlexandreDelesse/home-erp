function applyExtraSetup(sequelize) {
  const { exercice, activity, serie, account, user } = sequelize.models

  // workout.hasMany(activity)
  // activity.belongsTo(workout)

  activity.hasMany(serie)
  serie.belongsTo(activity)
  // serie.belongsTo(exercice)

  exercice.hasMany(activity)
  activity.belongsTo(exercice)

  account.hasMany(user)
  user.belongsTo(account)
}

module.exports = { applyExtraSetup }