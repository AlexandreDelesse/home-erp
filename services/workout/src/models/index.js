const dbConfig = require("../../config/db.config");
const { applyExtraSetup } = require("./extra-setup");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.workout = require("./workout.model")(sequelize, Sequelize);
db.activity = require("./activity.model")(sequelize, Sequelize);
db.exercice = require("./exercice.model")(sequelize, Sequelize);
db.serie = require("./serie.model")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);

applyExtraSetup(sequelize)

module.exports = db;
