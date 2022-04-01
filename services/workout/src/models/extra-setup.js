function applyExtraSetup(sequelize) {
  const { workout, activity, serie, exercice } = sequelize.models;
  console.log(exercice, workout);

  workout.hasMany(activity);

  activity.hasMany(serie);

  activity.belongsTo(exercice);
}

module.exports = { applyExtraSetup };
