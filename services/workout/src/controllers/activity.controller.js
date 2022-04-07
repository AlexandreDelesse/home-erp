const db = require("../models");

const Workout = db.workout;
const Activity = db.activity;
const Serie = db.serie;

exports.createActivity = async (req, res) => {
  const { id } = req.params;
  const newActivity = req.body;
  newActivity.workoutId = id;

  console.log(id);
  try {
    const workout = await Workout.findOne({ where: { id } });
    if (!workout) {
      res.status(404).send({ message: "Aucun workout avec cet ID" });
      return;
    }

    const activity = await Activity.create(newActivity, {
      include: [{ model: Serie }],
    });
    res.status(200).send(activity);
  } catch (err) {
    res.status(500).send({ message: "Failed to create activity", err });
  }
};

exports.findAll = async (req, res) => {
  try {
    const activity = await Activity.findAll({});
    res.status(200).send(activity);
  } catch (err) {
    res.status(500).send({ message: "Failed to get all activities", err });
  }
};
