import api from './api.config'

const createReward = async (reward) => {
  try {
    const newReward = await api.post('/rewards', reward)
    return newReward
  } catch (err) {
    throw err
  }
}

const getRewards = async () => {
  try {
    const rewards = await api.get('/rewards')
    return rewards.data
  } catch (err) {
    throw err
  }
}

const updateReward = async ({ id, reward }) => {
  console.log(reward)
  try {
    const rewardUpdated = await api.patch(`/rewards/${id}`, reward)
    return rewardUpdated
  } catch (err) {
    throw err
  }
}

const deleteReward = async (id) => {
  try {
    const result = await api.delete(`/rewards/${id}`)
    return result
  } catch (err) {
    throw err
  }
}

export { createReward, getRewards, updateReward, deleteReward }
