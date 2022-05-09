import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getUserSession } from "../../../services/user.service";

export default function useCurrentUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userSession = getUserSession();
    setUser(userSession);
  }, []);
  return user;
}
