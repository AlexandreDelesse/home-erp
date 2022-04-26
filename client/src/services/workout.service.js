import { workoutApi } from "./api.config";

// ----- workouts -----

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

// ----- Activities -----
const createActivityOnWorkout = async (workoutId, activity) => {
  try {
    const query = await workoutApi.post(
      `/workouts/${workoutId}/activity`,
      activity
    );
    return query.data;
  } catch (error) {
    throw error;
  }
};

export {
  getWorkouts,
  createEmptyWorkout,
  deleteWorkout,
  createActivityOnWorkout,
};
