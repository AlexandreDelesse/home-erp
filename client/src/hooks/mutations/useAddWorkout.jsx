import { useMutation, useQueryClient } from "react-query";
import { createEmptyWorkout } from "../../services/workout.service";
import { useNavigate } from "react-router-dom";

export default function useAddWorkout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(createEmptyWorkout, {
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries("workouts");
      navigate(`${data.id}`);
    },
    onError: (err) => {
      console.log("create workout error", err);
    },
  });

  return mutation;
}
