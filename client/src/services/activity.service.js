import { workoutApi } from "./api.config";

const createEmptyActivity = async ({ workoutId, activity }) => {
  activity.workoutId = workoutId;
  try {
    const newWorkout = await workoutApi.post("/activities", activity);
    return newWorkout.data;
  } catch (err) {
    throw err;
  }
};

const deleteActivity = async (activityId) => {
  try {
    const query = await workoutApi.delete(`/activities/${activityId}`);
    return query;
  } catch (err) {
    throw err;
  }
};

export { createEmptyActivity, deleteActivity };
