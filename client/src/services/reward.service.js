import { rewardApi } from "./api.config";

const createReward = async (reward) => {
  try {
    const newReward = await rewardApi.post("/rewards", reward);
    return newReward;
  } catch (err) {
    throw err;
  }
};

const getRewards = async () => {
  try {
    const rewards = await rewardApi.get("/rewards");
    return rewards.data;
  } catch (err) {
    throw err;
  }
};

const getCategories = async () => {
  try {
    const categories = await rewardApi.get("/rewards/categories");
    return categories.data;
  } catch (err) {
    throw err;
  }
};

const updateReward = async ({ id, reward }) => {
  try {
    const rewardUpdated = await rewardApi.patch(`/rewards/${id}`, reward);
    return rewardUpdated;
  } catch (err) {
    throw err;
  }
};

const deleteReward = async (id) => {
  try {
    const result = await rewardApi.delete(`/rewards/${id}`);
    return result;
  } catch (err) {
    throw err;
  }
};

export { createReward, getRewards, updateReward, deleteReward, getCategories };
