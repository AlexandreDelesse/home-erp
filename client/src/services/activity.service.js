import { workoutApi } from "./api.config";

const createEmptyActivity = async ({ workoutId, activity }) => {
  try {
    const newWorkout = await workoutApi.post(
      `/workouts/${workoutId}/activity`,
      activity
    );
    return newWorkout.data;
  } catch (err) {
    throw err;
  }
};

export { createEmptyActivity };
