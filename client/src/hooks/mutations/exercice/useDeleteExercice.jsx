import { useMutation, useQueryClient } from "react-query";
import { deleteExerciceById } from "../../../services/exercice.service";

export default function useDeleteExercice() {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteExerciceById, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("exercices");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return mutation;
}
