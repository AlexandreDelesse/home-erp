const db = require("../models");
const { Op } = require("sequelize");

const Reward = db.reward;

exports.create = async (req, res) => {
  newReward = req.body;

  try {
    const result = await Reward.create(newReward);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ message: "Failed to create Reward", err });
  }
};

exports.findAll = async (req, res) => {
  try {
    const result = await Reward.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "Failed to get all Rewards", err });
  }
};

exports.deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    await Reward.destroy({
      where: { id },
      truncate: false,
    });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send({
      message: "Failed to delete Reward with id : " + id,
      err,
    });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    await Reward.destroy({
      truncate: true,
    });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send({
      message: "Failed to delete all Rewards with id : " + id,
      err,
    });
  }
};
