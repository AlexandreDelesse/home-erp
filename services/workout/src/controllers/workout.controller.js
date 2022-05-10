const db = require("../models");

const Workout = db.workout;
const Activity = db.activity;
const Exercice = db.exercice;
const Serie = db.serie;
const User = db.user;

exports.create = async (req, res) => {
  newWorkout = req.body;

  try {
    const result = await Workout.create(newWorkout, {
      include: [{ model: Activity, include: [Serie] }],
    });

    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Failed to create Workout", err });
  }
};

exports.addActivity = async (req, res) => {
  const { workoutId } = req.params;
  const activity = req.body;

  try {
    const workout = await Workout.findOne({ where: { id: workoutId } });

    if (!workout) {
      res.status(404).send({ message: "No workout with this id" });
      return;
    }

    const activityCreated = await workout.createActivity(activity);

    res.status(200).send(activityCreated);
  } catch (err) {
    res.status(500).send({ message: "Failed to update Workout", err });
  }
};

exports.updateById = async (req, res) => {
  newWorkout = req.body;
  const { id } = req.params;

  try {
    const result = await Workout.update(newWorkout, { where: { id } });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "Failed to update Workout", err });
  }
};

exports.findAll = async (req, res) => {
  const { type, userId } = req.query;

  const whereStatement = type ? { type, userId } : { userId }; // get all if there is no type

  try {
    const result = await Workout.findAll({
      include: [
        {
          model: Activity,
          include: [{ model: Exercice }, { model: Serie }],
        },
      ],
      order: [[Activity, "createdAt", "ASC"]],
      where: whereStatement,
    });
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Failed to get all Workouts", err });
  }
};

exports.findById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Workout.findOne({
      where: { id },
      include: [
        { model: Activity, include: [{ model: Exercice }, { model: Serie }] },
      ],
    });
    if (!result) {
      res.status(404).send({ message: "Not found" });
      return;
    }
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Failed to get all Workouts", err });
  }
};

exports.deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    await Workout.destroy({
      where: { id },
      truncate: false,
    });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send({
      message: "Failed to delete Workout with id : " + id,
      err,
    });
  }
};
