import { useQuery } from "react-query";
import { getUsers } from "../../../services/user.service";

export default function useGetUsers() {
  const query = useQuery("users", getUsers);
  return query;
}
