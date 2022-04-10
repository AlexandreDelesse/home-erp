import { useQuery } from "react-query";
import { getWorkouts } from "../../services/workout.service";

export default function useGetWorkouts() {
  const query = useQuery("workouts", getWorkouts);
  return query;
}
