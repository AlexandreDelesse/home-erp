import { workoutApi } from "./api.config";
import { getUserSession } from "./user.service";

const getTrainings = async (id) => {
  try {
    const query = await workoutApi.get("/workouts?type=training&userId=" + id);
    return query.data;
  } catch (err) {
    throw err;
  }
};

export { getTrainings };
