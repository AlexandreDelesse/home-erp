import { useMutation, useQueryClient } from "react-query";
import { deleteWorkout } from "../../services/workout.service";

export default function useDeleteWorkout() {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteWorkout, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("workouts");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
}
