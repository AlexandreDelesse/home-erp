import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { createExercice } from "../../../services/exercice.service";

export default function useCreateExercice() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(createExercice, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("exercices");
      navigate(-1);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
}
