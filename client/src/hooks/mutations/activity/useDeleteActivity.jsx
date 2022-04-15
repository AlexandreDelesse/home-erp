import { useMutation, useQueryClient } from "react-query";
import { deleteActivity } from "../../../services/activity.service";

export default function useDeleteActivity() {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteActivity, {
    onSuccess: () => {
      queryClient.invalidateQueries("workouts");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
}
