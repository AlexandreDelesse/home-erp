const db = require("../models");

const Workout = db.workout;
const Activity = db.activity;
const Exercice = db.exercice;
const Serie = db.serie;

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

exports.createExercice = async (req, res) => {
  newExercice = req.body;

  try {
    const result = await Exercice.create(newExercice);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ message: "Failed to create Exercice", err });
  }
};

exports.findAll = async (req, res) => {
  console.log("get workouts");
  try {
    const result = await Workout.findAll({
      include: [
        { model: Activity, include: [{ model: Exercice }, { model: Serie }] },
      ],
    });
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Failed to get all Workouts", err });
  }
};

exports.findAllExercices = async (req, res) => {
  console.log("get workouts");
  try {
    const result = await Exercice.findAll();
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Failed to get all Exercices", err });
  }
};

// exports.findAllCategories = async (req, res) => {
//   try {
//     const result = await Reward.findAll();
//     const categories = result.map((reward) => reward.category);
//     const filteredCategories = categories.filter((ele, pos) => {
//       return categories.indexOf(ele) == pos;
//     });
//     res.status(200).send(filteredCategories);
//   } catch (err) {
//     res.status(500).send({ message: "Failed to get all Rewards", err });
//   }
// };

// exports.update = async (req, res) => {
//   newReward = req.body;
//   const { id } = req.params;

//   try {
//     const result = await Reward.update(newReward, { where: { id } });
//     res.status(200).send(result);
//   } catch (err) {
//     res.status(500).send({ message: "Failed to update all Rewards", err });
//   }
// };

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

// exports.deleteAll = async (req, res) => {
//   try {
//     await Reward.destroy({
//       truncate: true,
//     });
//     res.sendStatus(200);
//   } catch (err) {
//     res.status(500).send({
//       message: "Failed to delete all Rewards with id : " + id,
//       err,
//     });
//   }
// };
