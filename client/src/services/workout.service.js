import { workoutApi } from "./api.config";

// const createReward = async (reward) => {
//   try {
//     const newReward = await api.post("/rewards", reward);
//     return newReward;
//   } catch (err) {
//     throw err;
//   }
// };

const getWorkouts = async () => {
  try {
    const rewards = await workoutApi.get("/workouts");
    return rewards.data;
  } catch (err) {
    throw err;
  }
};

export { getWorkouts };
