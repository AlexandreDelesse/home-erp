import axios from "axios";

const rewardApi = axios.create({
  baseURL: process.env.API_URL || " http://192.168.1.15:5001/api",
  timeout: 1000,
});

const workoutApi = axios.create({
  baseURL: process.env.API_URL || " http://192.168.1.15:5002/api",
  timeout: 1000,
});

export { rewardApi, workoutApi };
