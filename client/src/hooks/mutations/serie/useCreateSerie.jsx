import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { createSerie } from "../../../services/serie.service";

export default function useCreateSerie() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(createSerie, {
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
