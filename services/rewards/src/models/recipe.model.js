module.exports = (sequelize, Sequelize) => {
  const recipe = sequelize.define('recipe', {
    recipe_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    recipe_title: { type: Sequelize.STRING },
    recipe_items: { type: Sequelize.JSON },
    recipe_kcal: { type: Sequelize.INTEGER },
    recipe_protein: { type: Sequelize.INTEGER },
    recipe_lipid: { type: Sequelize.INTEGER },
    recipe_glucid: { type: Sequelize.INTEGER },
    recipe_cooking_time: { type: Sequelize.INTEGER }
  })
  return recipe
}