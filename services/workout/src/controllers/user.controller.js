const db = require("../models");
const User = db.user;

exports.create = async (req, res) => {
  const user = req.body;

  try {
    const query = await User.create(user);
    res.status(201).send(query);
  } catch (err) {
    res.status(500).send({ message: "Failed to create user", err });
  }
};

exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: "Failed to get all users", err });
  }
};

exports.findByPk = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).send({ message: "No user with this id" });
      return;
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: "Failed to get user", err });
  }
};

exports.deleteByPk = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).send({ message: "No user with this id" });
      return;
    }
    const query = await user.destroy();
    res.status(200).send(query);
  } catch (err) {
    res.status(500).send({ message: "Failed to update Workout", err });
  }
};
