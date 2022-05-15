import { useContext } from "react";
import { useQuery } from "react-query";
import UserContext from "../../../contexts/User.context";
import { getTrainings } from "../../../services/training.service";

export default function useGetTrainings() {
  const { user } = useContext(UserContext);
  const query = useQuery("trainings", () => getTrainings(user.id));
  return query;
}
