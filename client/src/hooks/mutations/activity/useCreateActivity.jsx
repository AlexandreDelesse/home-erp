import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { createEmptyActivity } from "../../../services/activity.service";

export default function useCreateActivity() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(createEmptyActivity, {
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries("workouts");
      navigate(-1);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
}
