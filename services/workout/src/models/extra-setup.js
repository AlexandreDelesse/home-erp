function applyExtraSetup(sequelize) {
  const { workout, activity, serie, exercice, user } = sequelize.models;

  workout.hasMany(activity);
  workout.belongsTo(user);
  user.hasMany(workout);

  activity.hasMany(serie);

  activity.belongsTo(exercice);
}

module.exports = { applyExtraSetup };
