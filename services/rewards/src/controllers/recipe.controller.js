const db = require("../models");
const { Op } = require("sequelize");

const Recipe = db.recipe;

exports.create = async (req, res) => {
  newRecipe = req.body;

  try {
    const result = await Recipe.create(newRecipe);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ message: "Failed to create recipe", err });
  }
};

exports.findAll = async (req, res) => {
  try {
    const result = await Recipe.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "Failed to get all recipes", err });
  }
};

exports.deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    await Recipe.destroy({
      where: { id },
      truncate: false,
    });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send({
      message: "Failed to delete recipe with id : " + id,
      err,
    });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    await Recipe.destroy({
      truncate: true,
    });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send({
      message: "Failed to delete all recipes with id : " + id,
      err,
    });
  }
};
