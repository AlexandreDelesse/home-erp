import { workoutApi } from "./api.config";

const createEmptyWorkout = async () => {
  try {
    const newWorkout = await workoutApi.post("/workouts", {});
    return newWorkout.data;
  } catch (err) {
    throw err;
  }
};

const getWorkouts = async () => {
  try {
    const rewards = await workoutApi.get("/workouts");
    return rewards.data;
  } catch (err) {
    throw err;
  }
};

const deleteWorkout = async (workoutId) => {
  try {
    const rewards = await workoutApi.delete(`/workouts/${workoutId}`);
    return rewards.data;
  } catch (err) {
    throw err;
  }
};

export { getWorkouts, createEmptyWorkout, deleteWorkout };
