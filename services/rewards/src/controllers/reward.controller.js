const db = require('../models')

const Reward = db.reward

exports.create = async (req, res) => {
  newReward = req.body

  try {
    const result = await Reward.create(newReward)
    res.status(201).send(result)
  } catch (err) {
    res.status(500).send({ message: 'Failed to create Reward', err })
  }
}

exports.findAll = async (req, res) => {
  try {
    const result = await Reward.findAll()
    res.status(200).send(result)
  } catch (err) {
    res.status(500).send({ message: 'Failed to get all Rewards', err })
  }
}

exports.update = async (req, res) => {
  newReward = req.body
  const { id } = req.params

  try {
    const result = await Reward.update(newReward, { where: { rewardId: id } })
    res.status(200).send(result)
  } catch (err) {
    res.status(500).send({ message: 'Failed to update all Rewards', err })
  }
}

exports.deleteById = async (req, res) => {
  const { id } = req.params
  try {
    await Reward.destroy({
      where: { rewardId: id },
      truncate: false,
    })
    res.sendStatus(200)
  } catch (err) {
    res.status(500).send({
      message: 'Failed to delete Reward with id : ' + id,
      err,
    })
  }
}

exports.deleteAll = async (req, res) => {
  try {
    await Reward.destroy({
      truncate: true,
    })
    res.sendStatus(200)
  } catch (err) {
    res.status(500).send({
      message: 'Failed to delete all Rewards with id : ' + id,
      err,
    })
  }
}
