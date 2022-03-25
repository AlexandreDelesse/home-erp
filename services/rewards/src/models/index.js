const dbConfig = require('../../config/db.config')
const { applyExtraSetup } = require('./extra-setup')

const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.recipe = require('./recipe.model')(sequelize, Sequelize)
db.reward = require('./reward.model')(sequelize, Sequelize)

// applyExtraSetup(sequelize)

module.exports = db