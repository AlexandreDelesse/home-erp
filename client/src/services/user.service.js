import { workoutApi } from "./api.config";

const getUsers = async () => {
  try {
    const query = await workoutApi.get("/users");
    return query.data;
  } catch (err) {
    throw err;
  }
};
const isUser = () => {
  return false;
};

const saveUserSession = (user) => {
  window.sessionStorage.setItem("user", JSON.stringify(user));
};

const getUserSession = () => {
  const user = window.sessionStorage.getItem("user");
  return JSON.parse(user);
};

export { getUsers, saveUserSession, getUserSession, isUser };
